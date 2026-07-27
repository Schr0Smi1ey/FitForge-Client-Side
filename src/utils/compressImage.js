// Downscales + re-encodes an image File before upload so imgbb never receives a
// full-resolution phone photo. Targets mirror the sizes each field is actually
// rendered at, so a compressed upload is indistinguishable from the original on screen.
export const IMAGE_TARGETS = {
  // Classes.image, Forums.image, Trainers.profileImage — largest render is a w-full h-72 card.
  content: 1200,
  // Users.photo / photoURL — largest render is UserProfile's w-60 h-48.
  avatar: 600,
};

const QUALITY = 0.82;

async function loadBitmap(file) {
  // createImageBitmap honours EXIF orientation, so portrait phone photos don't come out sideways.
  if (typeof createImageBitmap === "function") {
    try {
      return await createImageBitmap(file, { imageOrientation: "from-image" });
    } catch {
      // Older Safari rejects the options bag; fall through to the <img> path.
    }
  }
  const url = URL.createObjectURL(file);
  try {
    return await new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("could not decode image"));
      img.src = url;
    });
  } finally {
    URL.revokeObjectURL(url);
  }
}

/**
 * @param {File} file      the file straight from an <input type="file">
 * @param {number} maxEdge longest-edge cap in px (see IMAGE_TARGETS)
 * @returns {Promise<File>} a smaller WebP File, or the original if shrinking it wouldn't help
 */
export default async function compressImage(file, maxEdge = IMAGE_TARGETS.content) {
  if (!file || !file.type?.startsWith("image/")) return file;
  // Animated GIFs would lose their animation on a canvas round-trip.
  if (file.type === "image/gif") return file;

  try {
    const bitmap = await loadBitmap(file);
    const { width, height } = bitmap;
    if (!width || !height) return file;

    const scale = Math.min(1, maxEdge / Math.max(width, height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(width * scale);
    canvas.height = Math.round(height * scale);
    canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close?.();

    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/webp", QUALITY)
    );
    // Already-small or already-efficient files can come out bigger — keep whichever wins.
    if (!blob || blob.size >= file.size) return file;

    return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".webp", {
      type: "image/webp",
      lastModified: Date.now(),
    });
  } catch {
    // Never block an upload because compression failed.
    return file;
  }
}
