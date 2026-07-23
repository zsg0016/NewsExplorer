export const authorize = (email, password) => {
  console.log(email, password);
  return new Promise((resolve) => {
    resolve({ token: "uewhyf9y892rty13y9" });
  });
};

export const checkToken = (token) => {
  console.log(token);
  return new Promise((resolve) => {
    resolve({
      data: { name: "user1", email: "johndoe@example,com", _id: "37463774393" },
    });
  });
};
