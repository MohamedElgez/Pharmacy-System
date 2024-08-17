<?php

namespace App\Http\Controllers;

use App\Http\Requests\categoryItemRequest;
use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use App\Models\Item;
use App\Traits\ApiTrait;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    use ApiTrait;
    //get all categories
    public function index(Request $request)
    {
        $categories = Category::Paginate(5);
        return $this->dataResponse(compact("categories"), "get all categories successfully");
    }
    // get specific category
    public function getOne(Request $request, $id)
    {
        $category = Category::find($id);
        if (!$category) {
            return $this->ErrorResponse(["category" => "this category id dosen't exist in database"], "category not exist", 404);
        } else {
            return $this->dataResponse(compact("category"));
        }
    }
    // create
    public function store(CategoryRequest $request)
    {
        $data = $request->validated();
        $category = new Category();
        $category->create($data);
        return $this->successResponse("category created successfuly", ["category" => $data], 201);
    }
    // update category
    public function update(CategoryRequest $request, $id)
    {
        $data = $request->validated();
        $category = Category::find($id);
        if (!$category) {
            return $this->ErrorResponse(["category" => "this category id dosen't exist in database"], "category not exist", 404);
        } else {

            $category->update($data);
            return $this->successResponse("success edit", ["category" => $data]);
        }
    }
    // delete
    public function destoryWithDeleteItems($id)
    {
        $category = Category::select("id", "name")->find($id);
        if (!$category) {
            return $this->ErrorResponse(["category" => "this category id dosen't exist in database"], "category not exist", 404);
        } else {

            Item::where("category_id", "=", $id)->delete();
            $data = $category;
            $category->delete();
            return $this->successResponse("category and it's items delete successfully", ["category" => $data]);
        }
    }
    public function CountItemsBelongs($id)
    {
        $category = Category::find($id);
        if (!$category) {
            return $this->ErrorResponse(["category" => "this category id dosen't exist in database"], "category not exist", 404);
        } else {
            $counts = Item::where("category_id", "=", $id)->count();
            return $this->DataResponse(["count" => $counts], "get count of items belongs to this category successfully ");
        }
    }

}
