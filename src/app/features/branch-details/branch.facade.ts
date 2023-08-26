import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from 'src/app/shared/helpers/modal/api.services';
// import { GlobalUrlDirective } from 'src/app/shared/helpers/modal/global-url';
import { GlobalUrlService } from 'src/app/shared/helpers/modal/global-url';
import { ToastrService } from 'ngx-toastr';
import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root',
})
export class ApiFacadeService {
    deletedData: any;
    constructor(private apiService: ApiService, private toastr: ToastrService,private http: HttpClient) { }


    // async importData(file: File) {
    //     try {
    //       const response = await this.apiService.importData(file).toPromise();
    //       this.toastr.success('Data imported successfully!', 'Success');
    //       // You can handle the response data if needed
    //     } catch (error) {
    //       this.toastr.error('Data import failed!', 'Error');
    //       console.error('Error while importing data:', error);
    //     }
    //   }

    async importFiles(files: FileList): Promise<void> {
        try {
          // Call the ApiService's importData method and await its completion
          const result = await this.apiService.importData(files);
          this.toastr.success('Data imported successfully!', 'Success');
          
          // Process the result if needed
          console.log('Import result:', result);
          
          // Handle any post-import operations here
          
          // For example, you can trigger a data refresh or display a success message.
          // The `result` variable will contain an array of objects, each representing a processed file.
          // Each object will have properties like 'filename' and 'contents' (if you resolved the promise accordingly).
          
          // Example: Refresh data after import
          // await this.refreshData();
    
          // Example: Show success message
          // this.showSuccessMessage('Import completed successfully!');
          
        } catch (error) {
          // Handle errors during import
          console.error('Import error:', error);
          this.toastr.error('Data import failed!', 'Error');
          // Show an error message or perform other error handling if needed
          // this.showErrorMessage('Import failed: ' + error.message);
        }
      }
      

   async saveFormInput(payload: any) {
        return new Promise(resolve => {
           return this.apiService.postByUrl(GlobalUrlService.post, payload).subscribe(res => {
                console.log("SaveInput:Payload", res);
                if (payload) {
                    this.toastr.success('Data saved successfully!', 'Success');

                }
                else {
                    this.toastr.error('Data is Not Saved', 'Error');
                }
            });
        });
    }


    deleteItemById(id: number) {
    
        console.log("this.Branch_id=====>", id);
        return new Promise(resolve => {
           return  this.apiService.deleteById(GlobalUrlService.delete, id).subscribe(res => {
                
                this.deletedData = res;
                this.deletedData=JSON.parse(this.deletedData);
                console.log("data", this.deletedData);
                 resolve(true);
            });
        });

    } 



    async getBranchById(id: number) {
        return new Promise(resolve => {
          return this.apiService.getDetailsById(GlobalUrlService.edit, +id).subscribe(
            (res: any) => {
              resolve(res);
              console.log(res);
            },
            (error: any) => {
              // Handle error here
              console.error('Error while fetching data by ID:', error);
              resolve(null); // Return null or handle the error case as needed
            }
          );
        });
      }
    



    // saveFormInput(payload: any) {
    //     return new Promise(resolve => {
    //       this.apiService.postByUrl(GlobalUrlService.post, payload).subscribe(res => {
    //         resolve(res);
    //         console.log(res);
    //       });
    //     });
    // }

    async getAllBranch() {
        return new Promise(resolve => {
            return this.apiService.getAllDetails(GlobalUrlService.branch).subscribe(res => {
                resolve(res);
                console.log("ggggggggggg", res);
            });
        });
    }

    async getAllGstPincode() {
        return new Promise(resolve => {
            return this.apiService.getAllDetails(GlobalUrlService.gstpincode).subscribe(res => {
                resolve(res);
                console.log("ggggggggggg", res);
            });
        });
    }


    exportData(): Observable<any> {
        const exportUrl = GlobalUrlService.export + '/pincode/export-File';
        return this.http.get(exportUrl);
      }
    
      
      async getBranchById1(id: number) {
        return new Promise(resolve => {
          return this.apiService.getDetailsById(GlobalUrlService.edit, +id).subscribe(
            (res: any) => {
              resolve(res);
              console.log(res);
            },
            (error: any) => {
              // Handle error here
              console.error('Error while fetching data by ID:', error);
              resolve(null); // Return null or handle the error case as needed
            }
          );
        });
    }

    async getBranchByIdPincode(id: number) {
        return new Promise(resolve => {
          return this.apiService.getDetailsById(GlobalUrlService.autopopulate, +id).subscribe(
            (res: any) => {
              resolve(res);
              console.log(res);
            },
            (error: any) => {
              // Handle error here
              console.error('Error while fetching data by ID:', error);
              resolve(null); // Return null or handle the error case as needed
            }
          );
        });
    }

    // async getDetailsByPincodeId(pincodeId: any) {
    //     try {
    //       const url = GlobalUrlService.autopopulate; // Update the URL based on your API endpoint
    //       const response = await this.http.get<any[]>(`${url}?PincodeId=${pincodeId}`).toPromise();
    //       return response;
    //     } catch (error) {
    //       console.error('Error while fetching data by pincodeId:', error);
    //       return null;
    //     }
    //   }


    getAllBranchByCountry() {
        return new Promise(resolve => {
            return this.apiService.getAllDetails(GlobalUrlService.country).subscribe(res => {
                resolve(res);
                console.log("ggggggggggg", res);
            });
        });
    }

    async getAllBranchByRole() {
        return new Promise(resolve => {
            return this.apiService.getAllDetails(GlobalUrlService.roles).subscribe(res => {
                resolve(res);
                console.log("ggggggggggg", res);
            });
        });
    }

    async getNextSequence() {
        return new Promise(resolve => {
            return this.apiService.getAllDetails(GlobalUrlService.sequence).subscribe(res => {
                resolve(res);
                console.log("ggggggggggg", res);
            });
        });
    }


    async getAllBranchByState() {
        return new Promise(resolve => {
            return this.apiService.getAllDetails(GlobalUrlService.state).subscribe(res => {
                resolve(res);
                console.log(res);
            });
        });
    }

    async getAllBranchByManager() {
        return new Promise(resolve => {
            return this.apiService.getAllDetails(GlobalUrlService.branchManager).subscribe(res => {
                resolve(res);
                console.log(res);
            });
        });
    }


    async getAllBranchByState1() {
        return new Promise(resolve => {
            return this.apiService.getAllDetails(GlobalUrlService.state).subscribe(res => {
                resolve(res);
                console.log(res);
            });
        });
    }

    async getAllBranchByPincode() {
        return new Promise(resolve => {
            return this.apiService.getAllDetails(GlobalUrlService.pincode).subscribe(res => {
                resolve(res);
                console.log(res);
            });
        });
    }

    async getAllBranchByRoles() {
        return new Promise(resolve => {
            return this.apiService.getAllDetails(GlobalUrlService.roles).subscribe(res => {
                resolve(res);
                console.log(res);
            });
        });
    }

    async getAllBranchByDesignation() {
        return new Promise(resolve => {
            return this.apiService.getAllDetails(GlobalUrlService.designation).subscribe(res => {
                resolve(res);
                console.log(res);
            });
        });
    }
    async getAllBranchByParentBranch() {
        return new Promise(resolve => {
            return this.apiService.getAllDetails(GlobalUrlService.parentBranch).subscribe(res => {
                resolve(res);
                console.log(res);
            });
        });
    }



    async getAllBranchByCity() {
        return new Promise(resolve => {
            return this.apiService.getAllDetails(GlobalUrlService.city).subscribe(res => {
                resolve(res);
                console.log(res);
            });
        });
    }




    async getAllBranchByRegion() {
        return new Promise(resolve => {
            return this.apiService.getAllDetails(GlobalUrlService.region).subscribe(res => {
                resolve(res);
                console.log("ggggggggggg", res);
            });
        });
    }


    async getAllBranchByGstPincode() {
        return new Promise(resolve => {
            return this.apiService.getAllDetails(GlobalUrlService.gstpincode).subscribe(res => {
                resolve(res);
                console.log("ggggggggggg", res);
            });
        });
    }

    downloadTemplate(): Observable<Blob> {
        return this.apiService.downloadTemplate();
      }

    async getAllBanks() {
        return new Promise(resolve => {
            return this.apiService.getAllDetails(GlobalUrlService.fields).subscribe(res => {
                resolve(res);
                console.log("ggggggggggg", res);
            });
        });
    }


    // async getFolderTreeById(applicationId:number){
    //     const queryParams = {applicationNumber:applicationId};
    //     return new Promise(resolve => {
    //       this.apiService.getDetailsByParams(globalUrl.folder,queryParams).subscribe(res => {
    //         resolve(res);
    //       });
    //     });
    //   }
}