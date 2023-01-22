import jsonwebtoken from 'jsonwebtoken';


interface Body {
  name: string | null;
  email: string | null;
  password: string | null;
}

class Validator {
  constructor() { }

  public emailValidator(email: string): boolean {
    const emailRegex =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return emailRegex.test(email);
  }

  public validateBody(requestBody: any, neededAttributes: string[]) {
    if (neededAttributes.length > 1) {
      for (let attr of neededAttributes) {
        if (!requestBody[attr]) {
          return {
            error: true,
            message: "all values needed",
            "missing value": attr,
          };
        }
      }
    } else {
      if (!requestBody[neededAttributes[0]]) {
        return {
          error: true,
          message: `${neededAttributes[0]} needed`,
          "missing value": neededAttributes[0],
        };
      }
    }

    return requestBody;
  }

  public validateToken(token: string, type: string, tokenSecret: string) {
    let result = {};
    jsonwebtoken.verify(
      token,
      tokenSecret,
      (err, decoded: any) => {
        if (err) {
          result = {
            error: true,
            decodingError: err
          };
        } else if (decoded.type === type) {
          result = {
            error: false,
            decoded: decoded
          };
        } else {
          result = {
            error: true,
            typeError: `${type} token needed`,
          };
        }
      }
    );

    return result;
  }
}

export default Validator;
