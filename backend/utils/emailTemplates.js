const forgotPassVerifyTemplate = (code) => {
  return `
    <center>
        <h2>Verify your email address</h2>
        <p>You need to verify your email address to reset your password. Enter the following code to verify your email address:</p>
        </br>
        <h4>${code}</h4>
    </center>`;
};

module.exports = { forgotPassVerifyTemplate };
