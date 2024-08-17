<?php

namespace App\Http\Controllers;

use App\Models\Unit;
use App\Traits\ApiTrait;
use Illuminate\Http\Request;
use App\Http\Requests\UnitRequest;
use App\Models\Item;

class UnitController extends Controller
{
    use ApiTrait;
    //get all units
    public function index(Request $request)
    {
        $units = Unit::Paginate(5);;
        return $this->dataResponse(compact("units"), "get all units successfully");
    }
    // get specific Unit
    public function getOne(Request $request, $id)
    {
        $unit = Unit::find($id);
        if (!$unit) {
            return $this->ErrorResponse(["Unit" => "Unit id dosen't exist in database"], "Unit not exist", 404);
        } else {
            return $this->dataResponse(compact("unit"));
        }
    }
    // create
    public function store(UnitRequest $request)
    {
        $data = $request->validated();
        $unit = new Unit();
        $unit->create($data);
        return $this->successResponse("Unit created successfuly", ["Unit" => $data], 201);
    }
    // update Unit
    public function update(UnitRequest $request, $id)
    {
        $data = $request->validated();
        $unit = Unit::find($id);
        if (!$unit) {
            return $this->ErrorResponse(["Unit" => "Unit id dosen't exist in database"], "Unit not exist", 404);
        } else {

            $unit->update($data);
            return $this->successResponse("success edit", ["Unit" => $data]);
        }
    }
    // delete
    public function destoryWithDeleteItems($id)
    {
        $unit = Unit::select("id", "name")->find($id);
        if (!$unit) {
            return $this->ErrorResponse(["unit" => "this unit id dosen't exist in database"], "unit not exist", 404);
        } else {

            Item::where("unit_id", "=", $id)->delete();
            $data = $unit;
            $unit->delete();
            return $this->successResponse("unit and it's items delete successfully", ["unit" => $data]);
        }
    }
    public function CountItemsBelongs($id)
    {
        $unit = Unit::find($id);
        if (!$unit) {
            return $this->ErrorResponse(["unit" => "this unit id dosen't exist in database"], "unit not exist", 404);
        } else {
            $counts = Item::where("unit_id", "=", $id)->count();
            return $this->DataResponse(["count" => $counts], "get count of items belongs to this unit successfully ");
        }

    }
}
