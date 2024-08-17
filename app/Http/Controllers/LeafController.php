<?php

namespace App\Http\Controllers;

use App\Models\Leaf;
use App\Traits\ApiTrait;
use Illuminate\Http\Request;
use App\Http\Requests\LeafRequest;

class LeafController extends Controller
{
    use ApiTrait;
    //get all leafs
    public function index(Request $request)
    {
        $leafs = Leaf::get();
        if ($request->wantsJson()) {
            return $this->dataResponse(compact("leafs"), "get all leafs successfully");
        }
    }
    // get specific Leaf
    public function getOne(Request $request, $id)
    {
        $leaf = Leaf::find($id);

        if (!$leaf) {
            return $this->ErrorResponse(["Leaf" => ["Leaf id dosen't exist in database"]], "Leaf not exist", 404);
        } else {
            return $this->dataResponse(compact("leaf"));
        }
    }
    // create
    public function store(LeafRequest $request)
    {
        $data = $request->validated();
        $leaf = new Leaf();
        $leaf->create($data);
        return $this->successResponse("Leaf created successfully", ["Leaf" => $data], 201);
    }
    // update Leaf
    public function update(LeafRequest $request, $id)
    {
        $data = $request->validated();
        $leaf = Leaf::find($id);
        if (!$leaf) {
            return $this->ErrorResponse(["Leaf" => "Leaf id dosen't exist in database"], "Leaf not exist", 404);
        } else {

            $leaf->update($data);
            return $this->successResponse("success update", ["Leaf" => $data]);
        }
    }
    // delete
    public function destory(Request $request, $id)
    {
        $leaf = Leaf::find($id);
        if (!$leaf) {
            return $this->ErrorResponse(["Leaf" => "Leaf id dosen't exist in database"], "Leaf not exist", 404);
        } else {
            $data = $leaf;
            $leaf->delete();
            return $this->successResponse("success delete", ["Leaf" => $data]);
        }
    }
}
