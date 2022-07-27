const transporter = require('./emailConfig');
const dotenv = require('dotenv');
dotenv.config();


const emailVerification = async (email, name, OTP) =>{

    let info = await transporter.sendMail({
        from: `Authentication Server <${process.env.EMAIL_FROM}>`,
        to:email,
        subject: "Verify your email to create your account",
        html: `  <table
        border="0"
        cellpadding="0"
        cellspacing="0"
        width="100%"
        style="table-layout: fixed; background-color: #f9f9f9"
        id="bodyTable"
      >
        <tbody>
          <tr>
            <td
              style="padding-right: 10px; padding-left: 10px"
              align="center"
              valign="top"
              id="bodyCell"
            >
              <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                width="100%"
                style="max-width: 600px"
              >
                <tbody>
                  <tr>
                    <td align="center" valign="top">
                      <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        class="tableCard"
                        style="
                          background-color: #fff;
                          border-color: #e5e5e5;
                          border-style: solid;
                          border-width: 0 1px 1px 1px;
                        "
                      >
                        <tbody>
                          <tr>
                            <td
                              style="
                                background-color: #00d2f4;
                                font-size: 1px;
                                line-height: 3px;
                              "
                              class="topBorder"
                              height="3"
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="padding-top: 60px; padding-bottom: 20px"
                              align="center"
                              valign="middle"
                            >
                              <a
                                href="#"
                                style="text-decoration: none"
                                target="_blank"
                              >
                                <img
                                  alt=""
                                  border="0"
                                  src="https://i.ibb.co/sJPD5kf/egro.png"
                                  style="
                                    width: 100%;
                                    max-width: 150px;
                                    height: auto;
                                    display: block;
                                  "
                                  width="150"
                                />
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                padding-bottom: 5px;
                                padding-left: 20px;
                                padding-right: 20px;
                              "
                              align="center"
                              valign="top"
                            >
                              <h2
                                class="text"
                                style="
                                  color: #000;
                                  font-family: Poppins, Helvetica, Arial,
                                    sans-serif;
                                  font-size: 28px;
                                  font-weight: 500;
                                  font-style: normal;
                                  letter-spacing: normal;
                                  line-height: 36px;
                                  text-transform: none;
                                  text-align: center;
                                  padding: 0;
                                  margin: 0;
                                "
                              >
                                Hi ${name}!
                              </h2>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                padding-bottom: 30px;
                                padding-left: 20px;
                                padding-right: 20px;
                              "
                              align="center"
                              valign="top"
                              class="subTitle"
                            >
                              <h4
                                class="text"
                                style="
                                  color: #999;
                                  font-family: Poppins, Helvetica, Arial,
                                    sans-serif;
                                  font-size: 16px;
                                  font-weight: 500;
                                  font-style: normal;
                                  letter-spacing: normal;
                                  line-height: 24px;
                                  text-transform: none;
                                  text-align: center;
                                  padding: 0;
                                  margin: 0;
                                "
                              >
                                Verify Your Email Account
                              </h4>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="padding-left: 20px; padding-right: 20px"
                              align="center"
                              valign="top"
                              class="containtTable ui-sortable"
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                class="tableDescription"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      style="padding-bottom: 20px"
                                      align="center"
                                      valign="top"
                                      class="description"
                                    >
                                      <p
                                        class="text"
                                        style="
                                          color: #666;
                                          font-family: 'Open Sans', Helvetica,
                                            Arial, sans-serif;
                                          font-size: 14px;
                                          font-weight: 400;
                                          font-style: normal;
                                          letter-spacing: normal;
                                          line-height: 22px;
                                          text-transform: none;
                                          text-align: center;
                                          padding: 0;
                                          margin: 0;
                                        "
                                      >
                                        Thanks for choosing us!. Please verify
                                        your account using this OTP.
                                      </p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                class="tableButton"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      style="
                                        padding-top: 20px;
                                        padding-bottom: 20px;
                                      "
                                      align="center"
                                      valign="top"
                                    >
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        align="center"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              style="
                                                background-color: rgb(
                                                  0,
                                                  210,
                                                  244
                                                );
                                                padding: 12px 35px;
                                                border-radius: 50px;
                                              "
                                              align="center"
                                              class="ctaButton"
                                            >
                                              <strong
                                                href="#"
                                                style="
                                                  color: #fff;
                                                  font-family: Poppins, Helvetica,
                                                    Arial, sans-serif;
                                                  font-size: 25px;
                                                  font-weight:700;
                                                  font-style: normal;
                                                  letter-spacing: 8px;
                                                  line-height: 20px;
                                                  text-decoration: none;
                                                  display: block;
                                                "
                                                >${OTP}</strong
                                              >
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="font-size: 1px; line-height: 1px"
                              height="20"
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td
                              align="center"
                              valign="middle"
                              style="padding-bottom: 40px"
                              class="emailRegards"
                            >
                              <!-- Image and Link // -->
                              <a
                                href="#"
                                target="_blank"
                                style="text-decoration: none"
                              >
                                <img
                                  mc:edit="signature"
                                  src="http://email.aumfusion.com/vespro/img//other/signature.png"
                                  alt=""
                                  width="150"
                                  border="0"
                                  style="
                                    width: 100%;
                                    max-width: 150px;
                                    height: auto;
                                    display: block;
                                  "
                                />
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        class="space"
                      >
                        <tbody>
                          <tr>
                            <td
                              style="font-size: 1px; line-height: 1px"
                              height="30"
                            >
                              &nbsp;
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                width="100%"
                class="wrapperFooter"
                style="max-width: 600px"
              >
                <tbody>
                  <tr>
                    <td align="center" valign="top">
                      <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        class="footer"
                      >
                        <tbody>
                          <tr>
                            <td
                              style="
                                padding-top: 10px;
                                padding-bottom: 10px;
                                padding-left: 10px;
                                padding-right: 10px;
                              "
                              align="center"
                              valign="top"
                              class="socialLinks"
                            >
                              <a
                                href="#facebook-link"
                                style="display: inline-block"
                                target="_blank"
                                class="facebook"
                              >
                                <img
                                  alt=""
                                  border="0"
                                  src="http://email.aumfusion.com/vespro/img/social/light/facebook.png"
                                  style="
                                    height: auto;
                                    width: 100%;
                                    max-width: 40px;
                                    margin-left: 2px;
                                    margin-right: 2px;
                                  "
                                  width="40"
                                />
                              </a>
                              <a
                                href="#twitter-link"
                                style="display: inline-block"
                                target="_blank"
                                class="twitter"
                              >
                                <img
                                  alt=""
                                  border="0"
                                  src="http://email.aumfusion.com/vespro/img/social/light/twitter.png"
                                  style="
                                    height: auto;
                                    width: 100%;
                                    max-width: 40px;
                                    margin-left: 2px;
                                    margin-right: 2px;
                                  "
                                  width="40"
                                />
                              </a>
                              <a
                                href="#pintrest-link"
                                style="display: inline-block"
                                target="_blank"
                                class="pintrest"
                              >
                                <img
                                  alt=""
                                  border="0"
                                  src="http://email.aumfusion.com/vespro/img/social/light/pintrest.png"
                                  style="
                                    height: auto;
                                    width: 100%;
                                    max-width: 40px;
                                    margin-left: 2px;
                                    margin-right: 2px;
                                  "
                                  width="40"
                                />
                              </a>
                              <a
                                href="#instagram-link"
                                style="display: inline-block"
                                target="_blank"
                                class="instagram"
                              >
                                <img
                                  alt=""
                                  border="0"
                                  src="http://email.aumfusion.com/vespro/img/social/light/instagram.png"
                                  style="
                                    height: auto;
                                    width: 100%;
                                    max-width: 40px;
                                    margin-left: 2px;
                                    margin-right: 2px;
                                  "
                                  width="40"
                                />
                              </a>
                              <a
                                href="#linkdin-link"
                                style="display: inline-block"
                                target="_blank"
                                class="linkdin"
                              >
                                <img
                                  alt=""
                                  border="0"
                                  src="http://email.aumfusion.com/vespro/img/social/light/linkdin.png"
                                  style="
                                    height: auto;
                                    width: 100%;
                                    max-width: 40px;
                                    margin-left: 2px;
                                    margin-right: 2px;
                                  "
                                  width="40"
                                />
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="padding: 10px 10px 5px"
                              align="center"
                              valign="top"
                              class="brandInfo"
                            >
                              <p
                                class="text"
                                style="
                                  color: #bbb;
                                  font-family: 'Open Sans', Helvetica, Arial,
                                    sans-serif;
                                  font-size: 12px;
                                  font-weight: 400;
                                  font-style: normal;
                                  letter-spacing: normal;
                                  line-height: 20px;
                                  text-transform: none;
                                  text-align: center;
                                  padding: 0;
                                  margin: 0;
                                "
                              >
                                ©&nbsp;e-grocery inc.  | 800 Broadway, Suite 1500 |
                                New York, NY 000123, USA.
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="padding: 0px 10px 20px"
                              align="center"
                              valign="top"
                              class="footerLinks"
                            >
                              <p
                                class="text"
                                style="
                                  color: #bbb;
                                  font-family: 'Open Sans', Helvetica, Arial,
                                    sans-serif;
                                  font-size: 12px;
                                  font-weight: 400;
                                  font-style: normal;
                                  letter-spacing: normal;
                                  line-height: 20px;
                                  text-transform: none;
                                  text-align: center;
                                  padding: 0;
                                  margin: 0;
                                "
                              >
                                <a
                                  href="#"
                                  style="color: #bbb; text-decoration: underline"
                                  target="_blank"
                                  >View Web Version </a
                                >&nbsp;|&nbsp;
                                <a
                                  href="#"
                                  style="color: #bbb; text-decoration: underline"
                                  target="_blank"
                                  >Email Preferences </a
                                >&nbsp;|&nbsp;
                                <a
                                  href="#"
                                  style="color: #bbb; text-decoration: underline"
                                  target="_blank"
                                  >Privacy Policy</a
                                >
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="padding: 0px 10px 10px"
                              align="center"
                              valign="top"
                              class="footerEmailInfo"
                            >
                              <p
                                class="text"
                                style="
                                  color: #bbb;
                                  font-family: 'Open Sans', Helvetica, Arial,
                                    sans-serif;
                                  font-size: 12px;
                                  font-weight: 400;
                                  font-style: normal;
                                  letter-spacing: normal;
                                  line-height: 20px;
                                  text-transform: none;
                                  text-align: center;
                                  padding: 0;
                                  margin: 0;
                                "
                              >
                                If you have any quetions please contact us
                                <a
                                  href="#"
                                  style="color: #bbb; text-decoration: underline"
                                  target="_blank"
                                  >support@mail.com.</a
                                >
                              </p>
                            </td>
                          </tr>
                          <tr>
                          </tr>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>`
    });


    return info;
}



module.exports = emailVerification;