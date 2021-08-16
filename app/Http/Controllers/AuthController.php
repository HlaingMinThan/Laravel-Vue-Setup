<?php

namespace App\Http\Controllers;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        request()->validate([
            'email' => 'required',
            'password' => 'required'
        ]);
        $credentials = request(['email', 'password']);

        if ($token = auth()->attempt($credentials)) {
            return response()
            ->json(['status' => 'success'], 200)
            ->header('Authorization', $token);
        }

        return response()->json(['error' => 'login_error'], 401);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function user()
    {
        $user = auth()->user();
        return response()->json([
            'status' => 'success',
            'data' => $user,
        ]);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh JWT token
     */
    public function refresh()
    {
        try {
            if ($token = auth()->refresh()) {
                return response()
                        ->json(['status' => 'successs', 'token' => $token], 200)
                        ->header('Authorization', $token);
            }
            return response()->json(['error' => 'refresh_token_error'], 401);
        } catch (\Exception $exception) {
            return response()->json(['error' => $exception->getMessage()], 401);
        }
    }
}
