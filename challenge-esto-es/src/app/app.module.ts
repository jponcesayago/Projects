import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



//PrimeNg Modules
import { DividerModule } from 'primeng/divider';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { BlockUIModule } from 'primeng/blockui';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
//import { ChartModule } from 'primeng/chart';
import { FieldsetModule } from 'primeng/fieldset';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ListboxModule } from 'primeng/listbox';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { MegaMenuModule } from 'primeng/megamenu';
import { ContextMenuModule } from 'primeng/contextmenu';
import { PickListModule } from 'primeng/picklist';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { SpinnerModule } from 'primeng/spinner';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MultiSelectModule } from 'primeng/multiselect';
import { KeyFilterModule } from 'primeng/keyfilter';
//import { EditorModule } from 'primeng/editor';
import { StepsModule } from 'primeng/steps';
//import { FullCalendarModule } from 'primeng/fullcalendar';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { DataViewModule } from 'primeng/dataview';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { PaginatorModule } from 'primeng/paginator';
import { CalendarModule } from 'primeng/calendar';
import { TabViewModule } from 'primeng/tabview';
import { PasswordModule } from 'primeng/password';
import { FocusTrapModule } from 'primeng/focustrap';
import { ToolbarModule } from 'primeng/toolbar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SliderModule } from 'primeng/slider';
import { RippleModule } from 'primeng/ripple';
import { DragDropModule } from 'primeng/dragdrop';
import { TreeModule } from 'primeng/tree';
import { SplitterModule } from 'primeng/splitter';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SplitButtonModule } from 'primeng/splitbutton';
//////////////////////////////////////////////////////////////////



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



//Componentes
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { ProjectsListComponent } from './modules/projects-list/projects-list.component';
import { ProjectFormComponent } from './modules/project-form/project-form.component';
import { SharedService } from './services/shared-service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ProjectsListComponent,
    ProjectFormComponent
  ],
  imports: [

    //Prime Ng Modules
    SidebarModule,
    ButtonModule,
    PanelModule,
    PanelMenuModule,
    MenuModule,
    TableModule,
    InputTextModule,
    BlockUIModule,
    DialogModule,
    DropdownModule,
    ToastModule,
    TooltipModule,
    PaginatorModule,
    DragDropModule,
    //ChartModule,
    FieldsetModule,
    ToggleButtonModule,
    ListboxModule,
    InputMaskModule,
    InputNumberModule,
    MegaMenuModule,
    CalendarModule,
    ContextMenuModule,
    PickListModule,
    MessagesModule,
    MessageModule,
    SpinnerModule,
    AutoCompleteModule,
    MultiSelectModule,
    KeyFilterModule,
    //EditorModule,
    StepsModule,
    //FullCalendarModule,
    CheckboxModule,
    RadioButtonModule,
    InputSwitchModule,
    ScrollPanelModule,
    DataViewModule,
    CardModule,
    FileUploadModule,
    TabViewModule,
    PasswordModule,
    FocusTrapModule,
    ToolbarModule,
    OverlayPanelModule,
    SliderModule,
    RippleModule,
    TreeModule,
    SplitterModule,
    SelectButtonModule,
    ConfirmDialogModule,
    DividerModule,
    SplitButtonModule,


    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    //angular
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
