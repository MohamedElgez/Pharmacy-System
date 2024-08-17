<?php

namespace App\Http\Controllers;

use App\Models\Type;
use App\Traits\ApiTrait;
use Illuminate\Http\Request;
use App\Http\Requests\TypeRequest;
use App\Models\Item;

class TypeController extends Controller
{
    use ApiTrait;
    //get all types
    public function index(Request $request)
    {
        $types = Type::Paginate(5);;
        return $this->dataResponse(compact("types"), "get all types successfully");
    }
    // get specific Type
    public function getOne(Request $request, $id)
    {
        $type = Type::find($id);
        if (!$type) {
            return $this->ErrorResponse(["Type" => "Type id dosen't exist in database"], "Type not exist", 404);
        } else {
        
            return $this->dataResponse(compact("type"));
        }
    }
    // create
    public function store(TypeRequest $request)
    {
        $data = $request->validated();
        $type = new Type();
        $type->create($data);
        return $this->successResponse("Type created successfuly", ["Type" => $data], 201);
    }
    // update Type
    public function update(TypeRequest $request, $id)
    {
        $data = $request->validated();
        $type = Type::find($id);
        if (!$type) {
            return $this->ErrorResponse(["Type" => "Type id dosen't exist in database"], "Type not exist", 404);
        } else {

            $type->update($data);
            return $this->successResponse("success update", ["Type" => $data]);
        }
    }
    // delete
    public function destoryWithDeleteItems($id)
    {
        $type = type::select("id", "name")->find($id);
        if (!$type) {
            return $this->ErrorResponse(["type" => "this type id dosen't exist in database"], "type not exist", 404);
        } else {

            Item::where("type_id", "=", $id)->delete();
            $data = $type;
            $type->delete();
            return $this->successResponse("type and it's items delete successfully", ["type" => $data]);
        }
    }
    public function CountItemsBelongs($id)
    {
        $type = Type::find($id);
        if (!$type) {
            return $this->ErrorResponse(["type" => "this type id dosen't exist in database"], "type not exist", 404);
        } else {
            $counts = Item::where("type_id", "=", $id)->count();
            return $this->DataResponse(["count" => $counts], "get count of items belongs to this type successfully ");
        }
    }
}
