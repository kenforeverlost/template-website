export const validateEmail = (email: string) => {
  const response: {
    result: boolean;
    message: string;
  } = {
    result: false,
    message: "",
  };

  try {
    const isRegexValid = /(.+)@(.+){2,}\.(.+){2,}/.test(email);
    if (!isRegexValid) {
      throw new Error("Please enter a valid email");
    }
    response["result"] = true;
    response["message"] = "Email is valid!";
  } catch (error: unknown) {
    response["message"] =
      error instanceof Error && error?.message !== ""
        ? error.message
        : "Something happened. Check back later!";
  }

  return response;
};

export const validatePassword = (password: string, process?: string) => {
  const response: {
    result: boolean;
    message: string;
  } = {
    result: false,
    message: "",
  };

  try {
    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }

    if (process === "signup") {
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumber = /\d/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

      if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
        throw new Error(
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        );
      }
    }

    response["result"] = true;
    response["message"] = "Password is valid!";
  } catch (error: unknown) {
    response["message"] =
      error instanceof Error && error?.message !== ""
        ? error.message
        : "Something happened. Check back later!";
  }

  return response;
};
