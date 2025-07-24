
export const AppSettings = {
    GetBaseUrl: function () {
        return sessionStorage.getItem("PortalBaseUrl");
    },
    SessionKeys: {
        CurrentWorkflow: 'PortalCurrentWorkflow',
        PresentationWizardPage: 'PortalPresentationWizardPage',
        CurrentErrors: 'PortalErrors',
        HomeWorkflow: 'PortalWorkflowHome'
    },
    Authorization: {
        Login: '/Login',
        LocalStorageDisplayNameKey: 'PortalDisplayName',
        LocalStorageUserNameKey: 'PortalUserName',
        LocalStorageProducerNameKey: 'PortalProducerName',
        LocalStorageProducerIdKey: 'PortalProducerId',
        LocalStorageTokenKey: 'PortalSessionToken',
        LocalStorageApplicationIdKey: 'PortalApplicationId',
        LocalStorageHomeWorkflowIdKey: 'PortalWorkflowHomeId',
        LocalStorageUserIdKey: 'PortalUserId',

        Role: {
            SupportAdmin: { key: 'UserType', value: 'SupportAdmin' },
            SiteAdmin: { key: 'UserType', value: 'SiteAdmin' },
            PortalUser: { key: 'UserType', value: 'PortalUser' },
            PortalConsumer: { key: 'UserType', value: 'PortalConsumer' }
        },
        Permission: {
            CreateApplications: { key: 'Permission', value: 'CreateApplications' },
            MarketingMaterials: { key: 'Permission', value: 'MarketingMaterials' },
            MarketingMaterialsManagement: { key: 'Permission', value: 'MarketingMaterialsManagement' },
            UserManagement: { key: 'Permission', value: 'UserManagement' },
            CompanyCreation: { key: 'Permission', value: 'CompanyCreation' },
            ViewLogs: { key: 'Permission', value: 'ViewLogs' },
            PaymentusAdmin: { key: 'Permission', value: 'PaymentusAdmin' },
            ApplicationSearch: { key: 'Permission', value: 'SearchApplications' },
            EditEquipment: { key: 'Permission', value: 'EditEquipment' },
            EditProfile: { key: 'Permission', value: 'EditProfile' },
            MakePayments: { key: 'Permission', value: 'MakePayments' },
        }
    },
    DynamicForm: {
        FormType: {
            RichText: 1,
            YesNoQuestion: 2,
            Dropdown: 3,
            UserTypedInput: 4,
            PageBreak: 5,
            NavigationButtons: 6,
            RadioList: 7, // for future use such as in 5P
            Url: 8,
            PageButton: 9,
            MultiItemPageRow: 10,
            FormValue: 11,
            DisplayItemsGrid: 12,
            DocusignEmbedded: 13,
            DateTimeInput: 14,
            ApplicationEmbedded: 15,
            UserTypedNumberInput: 16,
            LoadingSpinner: 17,
            CheckBox: 18,
            PaymentControl: 19,
            Modal: 20,
            FileUpload: 21,
            DynamicDropdown: 22,
            MapContainer: 23,
            RangeQuestion: 24,
            Signature: 25,
            MediaContainer: 26,
            CrudEditor: 27,
            WorfklowList: 28,
            PrimaryFirstNameInput: 29,
            PrimaryLastNameInput: 30,
            PrimaryStreetInput: 31,
            PrimarySuiteAptInput: 32,
            PrimaryCityInput: 33,
            PrimaryStateInput: 34,
            PrimaryZipInput: 35,
            PrimaryEmailInput: 36,
            ColorPicker: 37,
            ImagePicker: 38,
            PrimarySsnInput: 39,
            PrimaryDobInput: 40,
            CurrencyInput: 41,
            Repeater: 42,
            ColumnContainer: 43,
            DownloadLink: 45
        },
        FormButtonNavigationType: {
            NavigateNext: 1,
            NavigateBack: 2,
            NavigatePage: 3,
            NavigateUrl: 4,
            NavigateNone: 5,
            NavigateReload: 6,
            NavigateModal: 7,
            NavigateHome: 8,
            NavigateNewWorkflow: 9,
            NavigateForm: 10
        },
        ButtonType: {
            FormButton: "FormButton",
            EditButton: "EditButton",
            UploadDocumentIcon: "UploadDocumentIcon",
            LinkButton: "LinkButton",
            NextButton: "NextButton",
            ClearRepeaterButton: "ClearRepeaterButton",
            AddRepeaterButton: "AddRepeaterButton",
        }
    },
    LibraryService: {
        Type: {
            CompanyBranding: 'CompanyBranding',
            Dashboard: 'Dashboard',
            Document: 'Document',
            Feature: 'Feature',
            FormInstance: 'FormInstance',
            FormTemplate: 'FormTemplate',
            Lookup: 'Lookup',
            Processor: 'Processor',
            Producer: 'Producer',
            ReportInstance: 'ReportInstance',
            ReportTemplate: 'ReportTemplate',
            Role: 'Role',
            User: 'User'
        }
    }
}