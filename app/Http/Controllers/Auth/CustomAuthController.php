<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Auth;

class CustomAuthController extends Controller
{
    use AuthenticatesUsers;

    /**
     * Secure all methods calls
     */
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except('login');
    }

    /**
     * Check user's credentials and initialize a new token
     * based on AuthenticatesUsers@login method
     *
     * @SuppressWarnings(SuperGlobals)
     * @param Request $request
     */
    public function login(Request $request)
    {
        $this->validateLogin($request);

        if (method_exists($this, 'hasTooManyLoginAttempts') &&
            $this->hasTooManyLoginAttempts($request)) {
            $this->fireLockoutEvent($request);

            return $this->sendLockoutResponse($request);
        }

        if ($this->attemptLogin($request)) {

            // Generating a token associated with the current UserAgent
            $tokenName = "SanctumAPI-".md5($_SERVER['HTTP_USER_AGENT']);

            // Retrieving user
            $user = Auth::user();

            // Deleting old user's tokens
            $user->tokens()->where('name', $tokenName)->delete();

            return [
                'token' => $user->createToken($tokenName)->plainTextToken
            ];
        }

        $this->incrementLoginAttempts($request);
        return $this->sendFailedLoginResponse($request);
    }

    /**
     * Remove all user tokens (disconnect all "sessions")
     */
    public function logout()
    {
        $user = Auth::user();
        return $user->tokens()->where('name', 'like', 'SanctumAPI-%')->delete();
    }

    /**
     * Return current logged user's data
     */
    public function user()
    {
        return Auth::user();
    }

    /**
     * Return Laravel's session data
     *
     * @return array
     */
    public function session()
    {
        $user = Auth::user();
        return [
            'user'      => $user,
            'APP_NAME'  => env('APP_NAME', 'laravel'),
            'APP_ENV'   => env('APP_ENV', 'local'),
            'APP_DEBUG' => env('APP_DEBUG', false)
        ];
    }
}
