// import { Directive, OnInit } from "@angular/core";
// import configJson from "src/assets/config/config.json"

// @Directive()
// export class GlobalUrl implements OnInit {
//   public static apiUrl: string;
  

//   ngOnInit() {

//     GlobalUrl.apiUrl = configJson.gateway;

    
//   }
// }

// import { Directive, OnInit } from '@angular/core';
// import configJson from 'src/assets/config/config.json';

// @Directive()
// export class GlobalUrlDirective implements OnInit {
    // static gatewayUrl: string;
//   public static gatewayUrl: string;
//   public static baseUrl = GlobalUrlDirective.gatewayUrl + '/branch';
//   ngOnInit() {
    // GlobalUrlDirective.gatewayUrl = configJson.gateway;
//   }

// public static gateWayUrl = configJson.gateway;
  //public static gateWayUrl2 = configJson.gateWayUrl;
  //public static gateWayUrl3 = configJson.gateWayUrl3;

//   public static login = GlobalUrlDirective.gatewayUrl  + '/direct-login';
// }

import { OnInit, Directive } from '@angular/core';
import configJson from "src/assets/config/config.json";
import { Injectable } from '@angular/core';
@Directive()



@Injectable({
    providedIn: 'root',
  })
  export class GlobalUrlService implements OnInit {

    public static branch = configJson.gatewayurl +'/branch/pagination';
    public static fields=configJson.gatewayurl +'/branch';
    public static country=configJson.gatewayurl+'/master/get-country';
    public static region=configJson.gatewayurl+'/master/get-all-region';
    public static state=configJson.gatewayurl+'/master/get-state';
    public static roles=configJson.gatewayurl+'/master/get-role';
    public static city=configJson.gatewayurl+'/master/get-city';
    public static pincode= configJson.gatewayurl+'/master/getAllFromPincode';
    public static  designation= configJson.gatewayurl+'/master/get-designation';
    // public static pincode= configJson.gatewayurl+'/api/Pincode';
    public static parentBranch= configJson.gatewayurl+'/master/get-all-bank-data';
    public static branchManager= configJson.gatewayurl+'/master/get-all-Users';
    public static post= configJson.gatewayurl+'/branch';
    public static delete=configJson.gatewayurl+'/branch';
    public static edit=configJson.gatewayurl+'/branch/branchId';
    public static export=configJson.gatewayurl+'/branch/export';
    public static sequence=configJson.gatewayurl+'/get-nextSequence';
    public static download = configJson.gatewayurl+'/branch/download-sample-file';
    public static autopopulate=configJson.gatewayurl+'/master/get-by-pincodeId';
    public static gstpincode =configJson.gatewayurl+'/branch/getAllFromGstPincode';
    public static downloads=configJson.gatewayurl+'/branch/download-sample-file';
    public static imports = configJson.gatewayurl+'/branch/import';
    ngOnInit(): void {
    }
  }

  // export class GlobalUrlDirective  implements OnInit {



//     static gateway: string;
//     public static branch = GlobalUrlDirective.gateway + '/api/branch';
//   ngOnInit(): void {
      
//   }
// }

//   public static administratorApiName = "/administrator-api";