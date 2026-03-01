// Import all .png images in avatars folder
const avatarModules = import.meta.glob("./*.jpg" || "./*.png", {
  eager: true,
});

// Convert into a nice lookup object { filename: path }
const avatars = {};
for (const path in avatarModules) {
  const key = path.split("/").pop().replace(".jpg", ""); // e.g. "user1"
  avatars[key] = avatarModules[path].default;
}

const Avatar = ({ userName }) => {
  const avatar = avatars[userName]; // lookup by key
  if (!avatar) {
    return <div className="text-gray-500">No avatar found</div>;
  }

  return (
    <img
      src={avatar}
      alt={userName}
      className="h-auto max-w-full object-cover"
    />
  );
};

export default Avatar;
