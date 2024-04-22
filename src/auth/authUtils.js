"use strict";

const JWT = require("jsonwebtoken");

const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    // access token
    const accessToken = await JWT.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "2 days",
    });
    // refresh token
    const refreshToken = await JWT.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "7 days",
    });
    JWT.verify(accessToken, publicKey, (err, decode) => {
        if (err) {
            console.log(`error verify::`,err);
        } else {
            console.log(`decode verify::`,decode);
        
        }
    });
    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    return error;
  }
};

module.exports = {
  createTokenPair,
};
