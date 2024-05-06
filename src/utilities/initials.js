export const initials = (name = "") => {
  name = name?.split(" ").filter((e) => e.length > 0);
  if (name?.length > 1) {
    return `${name[0][0]}${name[1][0]}`.toUpperCase();
  } else {
    name = name[0];
    return `${name[0]}${name[name.length - 1]}`.toUpperCase();
  }
};
