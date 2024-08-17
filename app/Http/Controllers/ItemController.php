<?php

namespace App\Http\Controllers;

use App\Http\Requests\editcategoryItemRequest;
use App\Http\Requests\editTypeItemRequest;
use App\Http\Requests\editUnitItemRequest;
use App\Models\Item;
// use App\Models\Leaf;
use App\Models\Type;
use App\Models\Unit;
use App\Models\Category;
use App\Traits\ApiTrait;
use Illuminate\Http\Request;
use App\Http\Requests\ItemRequest;
use App\Models\suppliers;
use Illuminate\Support\Facades\DB;

class ItemController extends Controller
{
    use ApiTrait;
    //get all items
    public function index(Request $request)
    {
        $items = Item::with("category", "supplier", "type", "unit")->Paginate(10);

        return $this->dataResponse(compact("items"), "get all Items successfully");
    }
    // get specific Item
    public function getOne(Request $request, $id)
    {
        $item = Item::with("category", "supplier", "type", "unit")->find($id);
        if (!$item) {
            return $this->ErrorResponse(["Item" => "Item id dosen't exist in database"], "Item not exist", 404);
        } else {
            return $this->dataResponse(compact("item"), "get item successfully");
        }
    }
    // add
    public function add(Request $request)
    {
        $categories = Category::get();
        $units = Unit::get();
        $suppliers = suppliers::get();
        // $leafs = Leaf::get();
        $types = Type::get();
        return $this->DataResponse(["categories" => $categories, "units" => $units, "types" => $types, "suppliers" => $suppliers], "get categories , types  and units successfully");
    }

    // create
    public function store(ItemRequest $request)
    {
        $data = $request->validated();
        $Item = new Item();
        $Item->create($data);
        return $this->successResponse("Item created successfuly", ["Item" => $data], 201);
    }

    // update Item
    public function update(ItemRequest $request, $id)
    {
        $data = $request->validated();
        $Item = Item::find($id);
        if (!$Item) {
            return $this->ErrorResponse(["Item" => "Item id dosen't exist in database"], "Item not exist", 404);
        } else {
            $Item->update($data);
            return $this->successResponse("success update", ["Item" => $data]);
        }
    }
    // edit Item
    public function edit(Request $request, $id)
    {
        $item = Item::find($id);
        $categories = Category::get();
        $units = Unit::get();
        // $leafs = Leaf::get();
        $types = Type::get();
        if (!$item) {
            return $this->ErrorResponse(["Item" => "Item id dosen't exist in database"], "Item not exist", 404);
        } else {
            return $this->DataResponse(["item" => $item, "categories" => $categories, "units" => $units, "types" => $types], "get categories , types  and units successfully");
        }
    }
    // delete
    public function destory(Request $request, $id)
    {
        $Item = Item::find($id);
        if (!$Item) {
            return $this->ErrorResponse(["Item" => "this Item id dosen't exist in database"], "Item not exist", 404);
        } else {
            $data = $Item;
            $Item->delete();
            return $this->successResponse("success delete", ["Item" => $data]);
        }
    }
    public function editCategory(editcategoryItemRequest $request)
    {
        Category::where("id", "=", $request->past_category_id)->delete();
        $items = Item::where("category_id", "=", $request->past_category_id)->get();
        foreach ($items as $item) {
            $item->category_id = $request->new_category_id;
            $item->save();
        }
        return $this->successResponse("success delete category and edit for items", ["items" => $items]);
    }
    public function editType(editTypeItemRequest $request)
    {
        Type::where("id", "=", $request->past_type_id)->delete();
        $items = Item::where("type_id", "=", $request->past_type_id)->get();
        foreach ($items as $item) {
            $item->type_id = $request->new_type_id;
            $item->save();
        }
        return $this->successResponse("success delete type and edit for items", ["items" => $items]);
    }
    public function editUnit(editUnitItemRequest $request)
    {
        Unit::where("id", "=", $request->past_unit_id)->delete();
        $items = Item::where("unit_id", "=", $request->past_unit_id)->get();
        foreach ($items as $item) {
            $item->unit_id = $request->new_unit_id;
            $item->save();
        }
        return $this->successResponse("success delete unit and edit for items", ["items" => $items]);
    }
    // filter item by category
    public function filterItemByCategory($id)
    {
        $category = Category::find($id);
        if (!$category) {
            return $this->ErrorResponse(["category" => "this category id dosen't exist in database"], "category not exist", 404);
        } else {
            $items = Item::where("category_id", "=", $id)->get();
            return $this->DataResponse(compact("items"), "get items belongs to this category successfully ");
        }
    }
}
