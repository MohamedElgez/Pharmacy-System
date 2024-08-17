import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { medicine } from '../../types/common';
import { Login } from '../../components/Login';

const token =   localStorage.getItem("token");


export const medicinesApi = createApi({
    // unique key 

    reducerPath : 'AllMedicines',
    // http://127.0.0.1:8000/api/items/all
    baseQuery: fetchBaseQuery({baseUrl:'http://127.0.0.1:8000/api'}, ),
    tagTypes: ['pharm'],
    endpoints: (builder) => ({

        getMedicines: builder.query({
            query : (page) => ({url : "items/all", params:{page},
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'accept': 'application/json; charset=UTF-8',
                
              },}),
            providesTags: ['pharm']
        }), 

        getAddMedicine: builder.query({
            query : () => ({url : "items/add", 
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'accept': 'application/json; charset=UTF-8',
                'Authorization': token,
              },
        }),
        }), 

        storeMedicine:builder.mutation({
            query: (data) => ({url:"items/create", 
            method:'POST',
             body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'accept': 'application/json; charset=UTF-8',
                'Authorization':  token,
              },
              
        }),
        invalidatesTags: ['pharm']
 
        }),
        updateMedicine:builder.mutation({
            query: (data) => ({url:`items/update/${data.id}`, 
            method:'PUT',
             body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'accept': 'application/json; charset=UTF-8',
                'Authorization': token,
              },
              
        }),
        invalidatesTags: ['pharm']
        }),

        DeleteMedicine:builder.mutation({
            query: (id) => ({url:`items/delete/${id}`, method:'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'accept': 'application/json; charset=UTF-8',
                'Authorization': token,
              },
        }),

        invalidatesTags: ['pharm']
        }),


        getCategories: builder.query({
            query : () => ({url : "categories/all",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'accept': 'application/json; charset=UTF-8',
                'Authorization': token,
              },
        }),
            providesTags: ['pharm']
        }), 


        storeCategory:builder.mutation({
            query: (data) => ({url:"categories/add", 
            method:'POST',
             body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'accept': 'application/json; charset=UTF-8',
                'Authorization': token,
              },
              
        }),
        invalidatesTags: ['pharm']
 
        }),
        updateCategory:builder.mutation({
            query: (data) => ({
                url:`categories/edit/${data.id}`, 
                method:'PUT',
                body: data,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'accept': 'application/json; charset=UTF-8',
                    'Authorization': token,
                  },
            }),
            invalidatesTags: ['pharm']
         }),

         DeleteCategory:builder.mutation({
            query: (id) => ({url:`categories/delete/${id}`, method:'DELETE'}),

        invalidatesTags: ['pharm']
        }),




        //units
        getUnits: builder.query({
            query : () => ({url : "units/all",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'accept': 'application/json; charset=UTF-8',
                'Authorization': token,
              },
        }),
            providesTags: ['pharm']
        }), 


        storeUnit:builder.mutation({
            query: (data) => ({url:"units/add", 
            method:'POST',
             body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'accept': 'application/json; charset=UTF-8',
                'Authorization': token,
              },
              
        }),
        invalidatesTags: ['pharm']
 
        }),
        updateUnit:builder.mutation({
            query: (data) => ({
                url:`units/edit/${data.id}`, 
                method:'PUT',
                body: data,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'accept': 'application/json; charset=UTF-8',
                    'Authorization': token,
                  },
            }),
            invalidatesTags: ['pharm']
         }),

         DeleteUnit:builder.mutation({
            query: (id) => ({url:`units/delete/${id}`, method:'DELETE', 
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'accept': 'application/json; charset=UTF-8',
                'Authorization': token,
              },}),

        invalidatesTags: ['pharm']
        }),



        getTypes: builder.query({
            query : () => ({url : "types/all",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'accept': 'application/json; charset=UTF-8',
                'Authorization': token,
              },
        }),
            providesTags: ['pharm']
        }), 


        storeType:builder.mutation({
            query: (data) => ({url:"types/add", 
            method:'POST',
             body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'accept': 'application/json; charset=UTF-8',
                'Authorization': token,
              },
              
        }),
        invalidatesTags: ['pharm']
 
        }),
        updateType:builder.mutation({
            query: (data) => ({
                url:`types/edit/${data.id}`, 
                method:'PUT',
                body: data,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'accept': 'application/json; charset=UTF-8',
                    'Authorization': token,
                  },
            }),
            invalidatesTags: ['pharm']
         }),

         DeleteType:builder.mutation({
            query: (id) => ({url:`types/delete/${id}`, method:'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'accept': 'application/json; charset=UTF-8',
                'Authorization': token,
              },
        }),
        invalidatesTags: ['pharm']
        }),


        getSuppliers: builder.query({
            query : () => ({url : "supplier",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'accept': 'application/json; charset=UTF-8',
                'Authorization': token,
              },
        }),
            providesTags: ['pharm']
        }), 


        storeSupplier:builder.mutation({
            query: (data) => ({url:"supplier/store", 
            method:'POST',
             body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'accept': 'application/json; charset=UTF-8',
                'Authorization': token,
              },
              
        }),
        invalidatesTags: ['pharm']
 
        }),
        updateSupplier:builder.mutation({
            query: (data) => ({
                url:`supplier/update/${data.id}`, 
                method:'PUT',
                body: data,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'accept': 'application/json; charset=UTF-8',
                    'Authorization': token,
                  },
            }),
            invalidatesTags: ['pharm']
         }),

         DeleteSupplier:builder.mutation({
            query: (id) => ({
                url:`supplier/delete/${id}`, method:'DELETE',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'accept': 'application/json; charset=UTF-8',
                    'Authorization': token,
                  },
            
            }),

        invalidatesTags: ['pharm']
        }),

                // clients

                getClients: builder.query({
                    query : () => ({url : "client",
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                        'accept': 'application/json; charset=UTF-8',
                        'Authorization': token,
                      },
                }),
                    providesTags: ['pharm']
                }), 

                storeClient:builder.mutation({
                    query: (data) => ({url:"client/store", 
                    method:'POST',
                     body: data,
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                        'accept': 'application/json; charset=UTF-8',
                        'Authorization': token,
                      },
                      
                }),
                invalidatesTags: ['pharm']
         
                }),
                updateClient:builder.mutation({
                    query: (data) => ({
                        url:`client/update/${data.id}`, 
                        method:'PUT',
                        body: data,
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                            'accept': 'application/json; charset=UTF-8',
                            'Authorization': token,
                          },
                    }),
                    invalidatesTags: ['pharm']
                 }),
        
                 DeleteClient:builder.mutation({
                    query: (id) => ({
                        url:`client/delete/${id}`, method:'DELETE',
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                            'accept': 'application/json; charset=UTF-8',
                            'Authorization': token,
                          },
                    
                    }),
        
                invalidatesTags: ['pharm']
                }),

        // users 

        // login

        login:builder.mutation({
            query: (data) => ({url:"user/login", 
            method:'POST',
             body: data,
            headers: {
           
                'Accept': 'application/json',
               
              },
        }),
       
        }),


        checkLogin:builder.query({
            query: () => ({url:"/home", 
            method:'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Accept': 'application/json',
                'Authorization': token,
              },
        }),
        
        }),


        getUsers: builder.query({
            query : () => ({url : "user/all",
            headers:{
                'Content-type':'application/json; charset=UTF-8',
                'accept': 'application/json; charset=UTF-8',
                'Authorization': token,
              },

            }),
            providesTags: ['pharm']
        }), 


        storeUser:builder.mutation({
            query: (data) => ({url:"user/register", 
            method:'POST',
             body: data,
            headers:{
                'Content-type':'application/json; charset=UTF-8',
                'accept': 'application/json; charset=UTF-8',
                'Authorization': token,
              },

        }),
        invalidatesTags: ['pharm']
 
        }),
        updateUser:builder.mutation({
            query: (data) => ({
                url:`user/update/${data.id}`, 
                method:'PUT',
                body: data,
                headers: {
                    'Content-type':'application/json; charset=UTF-8',
                    'accept': 'application/json; charset=UTF-8',
                    'Authorization': token,
                  },
            }),
            invalidatesTags: ['pharm']
         }),

         DeleteUser:builder.mutation({
            query: (id) => ({url:`user/delete/${id}`, method:'DELETE'}),

        invalidatesTags: ['pharm']
        }),

        logout:builder.query({
            query: () => ({url : "user/logout",
            headers:{
                'Content-type':'application/json; charset=UTF-8',
                'accept': 'application/json; charset=UTF-8',
                'Authorization': token,
              },
              
            }),
            
        }), 


        //purchas-Invoice 

        getPurchas : builder.query({
            query : (page) => ({url : "purchas-Invoice", params:{page},
            headers:{
                'Content-type':'application/json; charset=UTF-8',
                'accept': 'application/json; charset=UTF-8',
                'Authorization': token,
              },

            }),
            providesTags: ['pharm']
        }), 


        getAddPurchas : builder.query({
            query : () => ({url : "purchas-Invoice/add",
            headers:{
                'Content-type':'application/json; charset=UTF-8',
                'accept': 'application/json; charset=UTF-8',
                'Authorization': token,
              },

            }),
            providesTags: ['pharm']
        }), 

              
        storepurchas:builder.mutation({
            query: (data) => ({url:"purchas-Invoice/store", 
            method:'POST',
             body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'accept': 'application/json; charset=UTF-8',
                'Authorization': token,
              },
        }),
        invalidatesTags: ['pharm']
 
        }),

            // return 


    getReturnPurchas : builder.query({
                query : (page) => ({url : "purchas-return-invoice", params:{page},
                headers:{
                    'Content-type':'application/json; charset=UTF-8',
                    'accept': 'application/json; charset=UTF-8',
                    'Authorization': token,
                  },
    
                }),
                providesTags: ['pharm']
            }),

     addRetutnPurchas : builder.query({
            query : () => ({url : "purchas-return-invoice/add",
            headers:{
                'Content-type':'application/json; charset=UTF-8',
                'accept': 'application/json; charset=UTF-8',
                'Authorization': token,
              },
        
            }),
            providesTags: ['pharm']
        }), 
        
              
        storeReturnPurchas:builder.mutation({
            query: (data) => ({url:"purchas-return-invoice/store", 
            method:'POST',
             body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'accept': 'application/json; charset=UTF-8',
                'Authorization': token,
              },
        }),
        invalidatesTags: ['pharm']
        
        }),



        /// sales
        getSales : builder.query({
            query : (page) => ({url : "sales-bill", params:{page},
            headers:{
                'Content-type':'application/json; charset=UTF-8',
                'accept': 'application/json; charset=UTF-8',
                'Authorization': token,
              },

            }),
            providesTags: ['pharm']
        }), 

        AddSale : builder.query({
            query : () => ({url : "sales-bill/add",
            headers:{
                'Content-type':'application/json; charset=UTF-8',
                'accept': 'application/json; charset=UTF-8',
                'Authorization': token,
              },

            }),
            providesTags: ['pharm']
        }), 
              
        storeSale:builder.mutation({
            query: (data) => ({url:"sales-bill/store", 
            method:'POST',
             body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'accept': 'application/json; charset=UTF-8',
                'Authorization': token,
              },
        }),
        invalidatesTags: ['pharm']
 
        }),

        getReturnSales : builder.query({
            query : (page) => ({url : "sales-return-bill", params:{page},
            headers:{
                'Content-type':'application/json; charset=UTF-8',
                'accept': 'application/json; charset=UTF-8',
                'Authorization': token,
              },

            }),
            providesTags: ['pharm']
        }), 

        addReturnSale : builder.query({
            query : () => ({url : "sales-return-bill/add",
            headers:{
                'Content-type':'application/json; charset=UTF-8',
                'accept': 'application/json; charset=UTF-8',
                'Authorization': token,
              },

            }),
            providesTags: ['pharm']
        }), 
              
        storeReturnSale:builder.mutation({
            query: (data) => ({url:"sales-return-bill/store", 
            method:'POST',
             body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'accept': 'application/json; charset=UTF-8',
                'Authorization': token,
              },
        }),
        invalidatesTags: ['pharm']
 
        }),



        addPurchasPayment : builder.query({
            query : (page) => ({url : "/supplier/payment/add", params:{page},
            headers:{
                'Content-type':'application/json; charset=UTF-8',
                'accept': 'application/json; charset=UTF-8',
                'Authorization': token,
              },

            }),
            providesTags: ['pharm']
        }), 


        storePurchasPayment:builder.mutation({
            query: (data) => ({url:"/supplier/payment/create", 
            method:'POST',
             body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'accept': 'application/json; charset=UTF-8',
                'Authorization': token,
              },
        }),
        invalidatesTags: ['pharm']
 
        }),




        addSalePayment : builder.query({
            query : () => ({url : "/client/payment/add",
            headers:{
                'Content-type':'application/json; charset=UTF-8',
                'accept': 'application/json; charset=UTF-8',
                'Authorization': token,
              },

            }),
            providesTags: ['pharm']
        }), 


        storeSalePayment:builder.mutation({
            query: (data) => ({url:"/client/payment/create", 
            method:'POST',
             body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'accept': 'application/json; charset=UTF-8',
                'Authorization': token,
              },
        }),
        invalidatesTags: ['pharm']
 
        }),
       
        reportsStockout : builder.query({
            query : (page) => ({url : "reports/item-stockout", params:{page},
            headers:{
                'Content-type':'application/json; charset=UTF-8',
                'accept': 'application/json; charset=UTF-8',
                'Authorization': token,
              },

            }),
            providesTags: ['pharm']
        }), 


        reportsExpiration:builder.query({
            query: (data) => ({url: "reports/expire",
            method:'POST',
             body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'accept': 'application/json; charset=UTF-8',
                'Authorization': token,
              },
        }),
        providesTags: ['pharm']
 
        }),



        reportsProfit:builder.query({
            query: (data) => ({url: "reports/profit",
             body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'accept': 'application/json; charset=UTF-8',
                'Authorization': token,
              },
        }),
        providesTags: ['pharm']
 
        }),

        reportsDebt:builder.query({
            query: (data) => ({url: "reports/debt",
             body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'accept': 'application/json; charset=UTF-8',
                'Authorization': token,
              },
        }),
        providesTags: ['pharm']
 
        }),

        reportsDues:builder.query({
            query: (data) => ({url: "reports/Dues",
             body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'accept': 'application/json; charset=UTF-8',
                'Authorization': token,
              },
        }),
        providesTags: ['pharm']
 
        }),

        getSupplierPayment : builder.query({
            query : () => ({url : "/supplier/payment",
            headers:{
                'Content-type':'application/json; charset=UTF-8',
                'accept': 'application/json; charset=UTF-8',
                'Authorization': token,
              },

            }),
            providesTags: ['pharm']
        }), 


        getClientPayment : builder.query({
            query : () => ({url : "/client/payment",
            headers:{
                'Content-type':'application/json; charset=UTF-8',
                'accept': 'application/json; charset=UTF-8',
                'Authorization': token,
              },

            }),
            providesTags: ['pharm']
        }), 

        getUserByToken:builder.query({
            query: (data) => ({url: "user",
             body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'accept': 'application/json; charset=UTF-8',
                'Authorization': token,
              },
        }),
        providesTags: ['pharm']
 
        }),
        
        

    })
})

export const {
    useGetMedicinesQuery, useGetAddMedicineQuery,
     useStoreMedicineMutation, useUpdateMedicineMutation,
     useDeleteMedicineMutation, 

     useGetCategoriesQuery, useStoreCategoryMutation, useUpdateCategoryMutation,
     useDeleteCategoryMutation,

     useGetUnitsQuery, useStoreUnitMutation, useUpdateUnitMutation,
     useDeleteUnitMutation,

     useGetTypesQuery, useStoreTypeMutation, useUpdateTypeMutation,
     useDeleteTypeMutation,

     useGetSuppliersQuery, useStoreSupplierMutation, useUpdateSupplierMutation,
     useDeleteSupplierMutation,

     useGetClientsQuery, useStoreClientMutation, useUpdateClientMutation,
     useDeleteClientMutation,

     useLoginMutation,useLogoutQuery, useCheckLoginQuery,
     useGetUsersQuery, useStoreUserMutation, useUpdateUserMutation,
     useDeleteUserMutation,

     useGetPurchasQuery,useGetAddPurchasQuery, useStorepurchasMutation,
     useStoreSaleMutation,useAddSaleQuery,

    useGetReturnPurchasQuery, useStoreReturnPurchasMutation,useAddRetutnPurchasQuery,

    useGetSalesQuery, useStoreReturnSaleMutation,useAddReturnSaleQuery,
     
    useGetReturnSalesQuery,

     useStorePurchasPaymentMutation, useAddPurchasPaymentQuery,
     useStoreSalePaymentMutation, useAddSalePaymentQuery,

    useReportsStockoutQuery, useReportsExpirationQuery, 

    useGetSupplierPaymentQuery, useGetClientPaymentQuery, 
    
    useReportsProfitQuery,
    useReportsDebtQuery,
    useReportsDuesQuery,
    useGetUserByTokenQuery,
       
    } = medicinesApi