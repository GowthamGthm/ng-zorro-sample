// import { Component, OnInit, ViewChild } from '@angular/core';
// import { AgGridAngular } from 'ag-grid-angular';
// import { ColDef, RowSelectionOptions, GridApi, GridReadyEvent } from 'ag-grid-community';
// import { DatePipe } from '@angular/common';
// import { MatDialog } from '@angular/material/dialog';
// import { MsalService } from '@azure/msal-angular';
// import { isEqual } from 'lodash';
// import { environment } from '../../../environments/environment';
// import { AlertDialogComponent } from '../../components/alert-dialog/alert-dialog.component';
// import { CSVUtils } from '../../shared/download-csv/csv-utils.component';
// import { User } from '../../shared/model/user.model';
// import { ProjectTaskService } from '../../shared/services/project-task.service';
// import { SharedDataService } from '../../shared/utils/shared-data.service';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { NzButtonSize } from 'ng-zorro-antd/button';
// import { UserGroupService } from '../../shared/services/user-group.service';
// import { Group } from '../../shared/model/user-group.model';
//
//
// @Component({
//   selector: 'app-project-tasks',
//   templateUrl: './project-tasks.component.html',
//   styleUrl: './project-tasks.component.css'
// })
// export class ProjectTasksComponent implements OnInit {
//
//   title = "Short Code Routing";
//   size: NzButtonSize = 'large';
//   redirectUrl = environment.redirect;
//   permissions: any = [];
//   currentUser: Partial<User>;
//   gridOptions = {
//     suppressHorizontalScroll: false,
//     sizeColumnsToFit: true,
//     enableCellTextSelection: true,
//   };
//   themeClass = 'ag-theme-quartz';
//   getRowStyle: any;
//   finalselectedRowsdata: any[] = [];
//
//   createProjectTaskForm!: FormGroup;
//
//   colDefs: ColDef[] = [
//     {
//       field: 'activityDefShortDesc',
//       headerName: 'Task Name',
//       flex: 1,
//       cellStyle: this.getCellStyle.bind(this)
//     },
//     {
//       field: 'activityDefLongDesc',
//       headerName: 'Description',
//       flex: 1,
//       cellStyle: this.getCellStyle.bind(this)
//     },
//     {
//       field: 'groupId',
//       headerName: 'Assigned Group',
//       flex: 1,
//       cellStyle: this.getCellStyle.bind(this)
//     },
//     {
//       field: 'durationDays',
//       headerName: 'Duration Days',
//       flex: 1,
//       cellStyle: this.getCellStyle.bind(this)
//     },
//     {
//       field: 'dateCreated',
//       headerName: 'Date Created',
//       flex: 1,
//       cellStyle: this.getCellStyle.bind(this)
//     },
//     {
//       field: 'createdBy',
//       headerName: 'Created BY',
//       flex: 1,
//       cellStyle: this.getCellStyle.bind(this)
//     },
//     {
//       field: 'hasNotes',
//       headerName: 'Notes',
//       flex: 1,
//       cellStyle: this.getCellStyle.bind(this)
//     },
//   ];
//
//   pagination = true;
//   paginationPageSize = 10;
//   paginationPageSizeSelector = [10, 20, 50, 100, 200];
//
//   defaultColDef = {
//     flex: 1,
//     filter: true,
//     floatingFilter: true,
//     resizable: true,
//     sortable: true,
//     wrapText: false,
//     editable: false,
//     headerClass: function () {
//       return 'header-one';
//     }
//   };
//   public rowSelection: RowSelectionOptions | 'single' | 'multiple' = {
//     mode: 'multiRow',
//     headerCheckbox: true,
//   };
//   selectedRowData: any[] = [];
//   @ViewChild('agGrid3') agGrid3!: AgGridAngular;
//   idAlreadyExists!: boolean;
//   desktopselectedRowscount: number = 0;
//   gridApi!: GridApi;
//   version!: string;
//   removedRows: any = 0;
//   desktopTotalRowscount: number = 0;
//   showCreateScrappiModal: boolean = false;
//   showAddChangeIdModal: boolean = false;
//   showDeleteShortCode: boolean = false;
//   isProd!: boolean;
//   ssoUser!: User;
//   pageLoadError!: boolean;
//   errorMessage!: string;
//   ssoComplete!: boolean;
//   hidden!: boolean;
//   modificationMap = new Map<number, { [field: string]: boolean }>();
//   parsedData: any;
//   shortCodeValue = "";
//   shortcodedoesNotExists: boolean = false;
//   showCreateProjectTaskModal: boolean = false;
//   desktopSelectedRows: any = [];
//   deletedRows = new Set<any>();
//   editClicked: boolean = false;
//
//   groupList : Group[] = [];
//
//   constructor(private msalService: MsalService,
//               private datePipe: DatePipe,
//               private dialog: MatDialog,
//               private ptService: ProjectTaskService,
//               private fb: FormBuilder,
//               private sharedDataService: SharedDataService,
//               private userGroupService : UserGroupService) {
//     this.hidden = true;
//     this.currentUser = this.sharedDataService.user();
//   }
//
//   async ngOnInit() {
//     this.loadTaskTableData();
//     this.version = environment.Version;
//     this.isProd = environment.production;
//     this.ssoUser = new User();
//     this.pageLoadError = false;
//     this.permissions = this.sharedDataService.permissions;
//     await this.msalService.instance.initialize();
//     await this.msalService.instance.handleRedirectPromise();
//     const accounts = await this.msalService.instance.getAllAccounts();
//
//     if (accounts.length > 0) {
//       await this.msalService.instance.setActiveAccount(accounts[0]);
//       this.ssoUser.email = accounts[0].username;
//     }
//
//     let loggedInUser = this.currentUser.ntid || '';
//     this.createProjectTaskForm = this.fb.group({
//       taskName: ['', Validators.required],
//       description: ['', Validators.required],
//       assignGroup: ['', Validators.required],
//       createdDate: [new Date()],
//       notes: ['', Validators.required, Validators.maxLength(1)],
//       durationDays: [0, Validators.required],
//       createdBy: [loggedInUser],
//       activityDefID: 0
//     });
//
//     this.loadGroupList();
//   }
//
//   loadGroupList() {
//     //TODO: implement backend
//     this.userGroupService.getGroups().subscribe({
//       next: (data) => {
//         console.log('group created successfully');
//         this.groupList = data;
//       },
//       error: (err) => {
//         console.error('Error loading groups', err);
//       },
//     });
//   }
//
//
//   editTaskClicked() {
//     const selectedRows = this.agGrid3.api.getSelectedRows();
//     if (selectedRows.length === 0) {
//       this.showAlert('Please select at least one task to edit.');
//       return;
//     }
//     this.desktopSelectedRows = selectedRows;
//     this.loadCommonValuesForBulkEdit(selectedRows);
//     // const selectedTask = selectedRows[0];
//     // this.loadEditTaskValues(selectedTask);
//     this.editClicked = true;
//     this.showProjectModal();
//
//   }
//
//   logForm() {
//     console.log(this.createProjectTaskForm);
//   }
//
//   compareEditWithExist(sample: any) {
//     const dataMap = new Map(sample.map((item: { profileId: any; shortCodePSTNMap: any[] }) => [item.profileId, item]));
//     this.finalselectedRowsdata = this.finalselectedRowsdata?.map((obj, index: number) => {
//       const matchingData = dataMap.get(obj.profileId);
//       if (matchingData) {
//         const mergedData = { ...obj, ...matchingData };
//         for (const field in obj) {
//           if (obj[field] && !isEqual(obj[field], (mergedData as any)[field])) {
//             mergedData.modifiedBy = this.ssoUser.email;
//             mergedData.modifiedDate = this.getIsoDate()
//             this.modificationMap.set(index, { ...this.modificationMap.get(index), [field]: true });
//           }
//         }
//         return mergedData;
//       }
//       return obj;
//     });
//   }
//
//   onCreateProfileClick(grid: AgGridAngular) {
//     this.showCreateScrappiModal = true;
//   }
//
//   downloadCSV() {
//     if (!this.gridApi) {
//       this.showAlert('Grid API is not initialized!');
//       return;
//     }
//     const allData: any[] = [];
//     this.gridApi.forEachNode((node) => {
//       allData.push(node.data);
//     });
//     if (allData.length === 0) {
//       this.showAlert('No data available in the DetailsFrame');
//       return;
//     }
//     const headers = Object.keys(allData[0]);
//     let timestamp = this.datePipe.transform(new Date(), 'yyyy_MM_dd_HH_mm_ss');
//     const filename = `project_task_report_${timestamp}.csv`;
//     CSVUtils.downloadCSV(allData, headers, filename);
//   }
//
//
//   onGridReady() {
//     this.desktopTotalRowscount = this.agGrid3.api.getDisplayedRowCount();
//   }
//
//   onGridReady2(params: GridReadyEvent<any>) {
//     this.gridApi = params.api;
//     setTimeout(() => {
//       const columns = this.gridApi.getAllGridColumns();
//       const allcolumns = columns.map(col => col.getColId());
//       this.gridApi.autoSizeColumns(allcolumns, false);
//       this.agGrid3.api.sizeColumnsToFit();
//     }, 100);
//
//   }
//
//   onSelectionChanged(gridnum: string) {
//     this.desktopselectedRowscount = this.agGrid3.api.getSelectedRows().length;
//     this.desktopSelectedRows = this.agGrid3.api.getSelectedRows();
//   }
//
//   async loadTaskTableData(): Promise<void> {
//     try {
//       const response = await this.ptService.getProjectTasks();
//       this.finalselectedRowsdata = response.responseData;
//       this.finalselectedRowsdata.forEach(item => {
//         item.toDelete = false;
//       })
//       console.log(this.finalselectedRowsdata);
//     } catch (error: any) {
//       console.error('Error loading tasks:', error.message);
//       this.showAlert("Error Loading task");
//     }
//   }
//
//   getCellStyle(params: any): { [key: string]: string } | null {
//     const rowIndex = params.node.rowIndex;
//     if (this.deletedRows.has(rowIndex)) {
//       return { textDecoration: 'line-through' };
//     }
//     return null;
//   }
//
//   markRowsForDelete() {
//     this.deletedRows.clear();
//     const selectedNodes = this.agGrid3.api.getSelectedNodes();
//     if (selectedNodes.length > 0) {
//       selectedNodes.forEach((node) => {
//         const data = node.data;
//         data.toDelete = true;
//         this.deletedRows.add(node.rowIndex);
//       });
//       this.agGrid3.api.refreshCells({ force: true });
//     } else {
//       setTimeout(() => {
//         this.showAlert('Please select at least one Project Task to Delete');
//       }, 100);
//     }
//   }
//
//   commitConfirmationDialog() {
//
//     this.dialog.open(AlertDialogComponent, {
//       data: {
//         message: 'Project Task(s) Deleted created',
//         onOk: () => {
//           this.commitDelete();
//         },
//         onCancel: () => { }
//       },
//       width: '500px',
//       disableClose: true,
//       panelClass: 'custom-dialog',
//     });
//
//   }
//
//   undoDelete() {
//     const selectedNodes = this.agGrid3.api.getSelectedNodes();
//     if (selectedNodes.length > 0) {
//       selectedNodes.forEach((node) => {
//         const data = node.data;
//         data.toDelete = false;
//         this.deletedRows.delete(node.rowIndex);
//       });
//       // this.deletedRows.clear();
//       this.agGrid3.api.redrawRows();
//     } else {
//       setTimeout(() => {
//         this.showAlert('Please select at least one Project Task to undo');
//       }, 100);
//     }
//   }
//
//   commitDelete() {
//     let selectedNodes = this.agGrid3.api.getSelectedNodes();
//     let markedForDelete = selectedNodes.filter(node => node.data.toDelete === true);
//     let deleteIds = markedForDelete.map(node => node.data.activityDefID);
//     let request = {
//       ids: deleteIds
//     }
//
//     this.ptService.deleteProjects(request)
//       .subscribe({
//         next: (response) => {
//           console.log('Success:', response);
//           this.deletedRows.clear();
//           this.hideProjectModal();
//           this.finalselectedRowsdata = this.finalselectedRowsdata.filter(row => row.toDelete === false);
//           this.showAlert('Project Task Deleted Successfully');
//           this.agGrid3.api.redrawRows();
//         },
//         error: (error) => {
//           console.log('Error:', error);
//           this.showAlert('Project Task Deletion Failed');
//         }
//       });
//
//
//   }
//
//   showAlert(message: string): void {
//     this.dialog.open(AlertDialogComponent, {
//       data: { message },
//       width: '500px',
//       disableClose: true,
//       panelClass: 'custom-dialog',
//     });
//   }
//
//
//   getIsoDate(): string {
//     const now = new Date();
//     return now.toISOString();
//   }
//
//   dummy() {
//
//   }
//
//
//   // create project task modal
//
//   showProjectModal() {
//     this.showCreateProjectTaskModal = true;
//   }
//
//   hideProjectModal() {
//     this.showCreateProjectTaskModal = false;
//     this.editClicked = false;
//     this.resetProjectForm();
//   }
//
//   createProject() {
//
//     const formValue = {
//       ...this.createProjectTaskForm.value,
//       createdDate: this.datePipe.transform(this.createProjectTaskForm.value.createdDate, "MM-dd-yyyy"),
//       assignGroup : +this.createProjectTaskForm.get('assignGroup')?.value || 0
//     };
//
//     this.ptService.createProject(formValue).subscribe({
//       next: (response) => {
//         this.hideProjectModal();
//         this.showAlert('Project Task(s) Successfully created');
//       },
//       error: (error) => {
//         console.log('Error:', error);
//         this.showAlert('Project Task(s) Creation Failed');
//       }
//     });
//
//   }
//
//   updateProject() {
//     let updatedValues = this.createProjectTaskForm.value;
//
//     const formValue = {
//       ...updatedValues,
//       createdDate: this.datePipe.transform(updatedValues.createdDate, "MM-dd-yyyy"),
//       assignGroup : +this.createProjectTaskForm.get('assignGroup')?.value || 0
//     };
//
//     this.ptService.updateProjectTasks(formValue)
//       .then(response => {
//         this.showAlert('Project Task(s) updated successfully');
//       })
//       .catch(error => {
//         this.showAlert('Task update failed. Please try again.');
//       });
//
//   }
//
//
//   loadEditTaskValues(task: any) {
//
//     this.createProjectTaskForm.patchValue({
//       taskName: task.activityDefShortDesc || '',
//       description: task.activityDefLongDesc || '',
//       assignGroup: String(task.groupId || '' ),
//       durationDays: task.durationDays || 0,
//       createdDate: task.dateCreated ? new Date(task.dateCreated) : '',
//       createdBy: task.createdBy || this.currentUser.ntid,
//       notes: task.hasNotes || '',
//       activityDefID: task.activityDefID || 0
//     });
//   }
//
//   loadCommonValuesForBulkEdit(tasks: any[]) {
//
//     const first = tasks[0];
//
//     // Example: Set fields only if all selected rows have same value
//     const allSame = (field: string) =>
//       tasks.every(task => task[field] === first[field]);
//
//     this.createProjectTaskForm.patchValue({
//       taskName: '', // Leave blank or disable this field
//       description: '',
//       assignGroup: allSame('groupId') ? +first.groupId : '',
//       durationDays: allSame('durationDays') ? first.durationDays : 0,
//       createdDate: '', // optional
//       createdBy: this.currentUser.ntid,
//       notes: allSame('hasNotes') ? first.hasNotes : ''
//     });
//   }
//
//
//   resetProjectForm() {
//
//     const defaultValue = {
//       createdBy: this.currentUser.ntid || '',
//       createdDate: new Date(),
//       durationDays: 0,
//       assignGroup: '',
//       activityDefID: 0
//     };
//     this.createProjectTaskForm.reset(defaultValue);
//
//   }
//
//
// }
