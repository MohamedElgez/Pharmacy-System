<?php

namespace App\Traits;

Trait ApiTrait
{
    public function successResponse(string $message,array $data,int $statusCode = 200)
    {
        return response()->json(
            [
                "success" => true,
                "message" => $message,
                "data" => (object)$data,
                "errors" => (object)[]
            ],
            $statusCode
        );
    }
    public function ErrorResponse(array $errors = [], string $message = "", int $statusCode = 400)
    {
        return response()->json(
            [
                "success" => false,
                "message" => $message,
                "data" => (object)[],
                "errors" => (object)$errors
            ],
            $statusCode
        );
    }
    public function DataResponse(array $data = [], string $message = "", int $statusCode = 200)
    {
        return response()->json(
            [
                "success" => true,
                "message" => $message,
                "data" => (object)$data,
                "errors" => (object)[]
            ],
            $statusCode
        );
    }
}
