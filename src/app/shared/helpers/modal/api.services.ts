import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { GlobalUrlDirective } from "src/app/shared/helpers/modal/global-url";
import { GlobalUrlService } from 'src/app/shared/helpers/modal/global-url';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // private baseUrl = GlobalUrlDirective.gateway + '/branch'; // Forming the complete API URL


  constructor(private http: HttpClient) { }

  getAllDetails(url: any) {
    return this.http.get<any>(url);
  }

  // public getDetailsById(url: string, id: any) {

  //   return this.http.get<any[]>(`${url}/${id}`);
  // }

  getDetailsById(url: string, api_id: any) {
    return this.http.get<any[]>(url + '?branchId=' + api_id, {});
  }

  // getDetailsByPincodeId(url: string, api_id: any) {
  //   return this.http.get<any[]>(url + '?PincodeId=' + api_id, {});
  // }
  downloadTemplate(): Observable<Blob> {
    return this.http.get(GlobalUrlService.downloads, { responseType: 'blob' });
  }

  getDetailsByPincodeId(pincodeId: any): Observable<any[]> {
    const url = `${GlobalUrlService.autopopulate}?PincodeId=${pincodeId}`;
    return this.http.get<any[]>(url);
  }

  getExport(url: any): Observable<any> {
    console.log('Calling getExport:', url);
    return this.http.get(url);
  }
  downloadFile(url: string, fileName?:any) {
    if(fileName){
        return this.http.get(`${url}?fileName=${fileName}`,{ responseType: 'blob' })
      }
      else{
        return this.http.get(url,{ responseType: 'blob' })
      }
   }

  public getDetailsPagination(url: string, pageNumber: number, pageSize: number) {
    return this.http.get<any[]>(`${url}?pageNumber=${pageNumber}&pageSize=${pageSize}`, {});
  }


  public postByUrl(url: string, payload: any) {
    return this.http.post(url, payload);
  }



  public deleteById(url: string, id: number) { // use this method when you need to delete data with api id
    console.log(url + "/" + id);
    return this.http.delete(`${url}/${id}`);
  }

  // importData(file: File): Observable<any> {
  //   const formData: FormData = new FormData();
  //   formData.append('file', file, file.name);

  //   return this.http.post(GlobalUrlService.imports, formData);
  // }


  importData(files: FileList): Promise<any> {
    // Assuming you want to process each file in the FileList
    const promises = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const promise = this.processFile(file); // Implement the logic to process a single file
      promises.push(promise);
    }

    // Use Promise.all to wait for all file processing to complete
    return Promise.all(promises);
  }

  private processFile(file: File): Promise<any> {
    // Implement the logic to process a single file here
    // For example, you can read the file content and perform the necessary operations
    // Once the import is successful, resolve the promise with the result
    return new Promise((resolve, reject) => {
      // Sample asynchronous file processing (reading contents)
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const contents = event.target.result;
        // Process the file contents here
        resolve({ filename: file.name, contents });
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsText(file);
    });
  }

}