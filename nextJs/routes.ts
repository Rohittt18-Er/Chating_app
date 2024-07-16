/*
 * an array that accessible to the public
 */

export const publicRoutes = ["/"];

/*
* an array that use for authentication
routes do not require authentication
* these rotes redirect to logged in user to /dashboard
*/

export const authRoutes = ["/login", "/register"];

/*
 * the prifix for api authentication routes
 * Routes that start with this prifix are used for api authentication purpose
 *  these rotes redirect to logged in user to /dashboard
 */

export const apiAuthPrefix = "/api/auth";

/*
 * default redirect after login
 */

export const DEFAULT_LOGIN_REDIRECT = "/setting";
