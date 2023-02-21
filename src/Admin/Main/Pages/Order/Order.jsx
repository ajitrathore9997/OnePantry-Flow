import React from 'react'
import { Link } from 'react-router-dom'

export default function Order() {
  return (
    <>
    <section class="content-header">
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-6">
        <h1 class="default_color">Orders</h1>
      </div>
      <div class="col-sm-6">
        <ol class="breadcrumb float-sm-right">
          <li class="breadcrumb-item"><Link to={"/panel/dashboard"}>Dashboard</Link></li>
          <li class="breadcrumb-item active">Orders</li>
        </ol>
      </div>
    </div>
  </div>
</section>
    
<section class="content  d-flex justify-content-center">
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card wrap cddr2">
 
          <div class="card-body">
 

            <div class="card-body table-responsive">
              <table class="table table-hover text-nowrap">
                <thead>
                  <tr>
                    <th class="text-center">S.No</th>
                    <th class="text-center">Seller</th>
                    <th class="text-center">Buyer</th>
                    <th class="text-center">Quantity</th>
                    <th class="text-center">Commission $</th>
                    <th class="text-center">Total Bill $</th>
                    <th class="text-center">Created At</th>
                    <th class="text-center">Action</th>
                  </tr>
                </thead>
                {/* <tbody>
                  <ng-container *ngIf="collectionSize>0">
                    <tr *ngFor="let value of reportlist; let i=index">
                      <td class="text-center">{{ i + counting + 1}}</td>

                      <td class="text-center">{{value?.Seller_detail?.username?value?.Seller_detail?.username:'N/A'}}
                      </td>
                      <td class="text-center">{{value?.User_detail?.username?value?.User_detail?.username:'N/A'}}</td>
                      <td class="text-center">{{value?.quantity}}</td>
                      <td class="text-center">{{value?.commission}}</td>
                      <td class="text-center">{{value?.total_bill}}</td>
                      <td class="text-center">{{value?.created_at | date : 'd/M/yy, h:mm a'}}</td>
                      <td class="text-center">
                        <a class="mx-2 table-icon" title="View" routerLink="view/{{value?._id}}"><span
                            class="text-warning fas fa-eye"></span></a>
                      </td>

                    </tr>
                  </ng-container>
                  <ng-container *ngIf="collectionSize==0">
                    <tr>
                      <td colspan="8"> No Data Found</td>
                    </tr>
                  </ng-container>
                </tbody> */}
              </table>
              <div class="mt-4"> 
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  </div> 
</section>
    
    </>
  )
}
