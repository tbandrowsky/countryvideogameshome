# Country Video Games Home - AI Coding Agent Instructions

## Project Architecture Overview

This is a **React Static Web App** (`staticwebapp.config.json`) with a unique dual-purpose structure:
- **Main Site**: Gaming/news content with pages like News, ColorParty, RevolutionAbout
- **Corona Subsystem**: A complete data management application with CRUD operations at `/Corona/*` routes

### Key Architectural Patterns

**Dual Navigation System**:
- Main site uses standard React Router with links in `MenuBar.js`
- Corona system has dedicated navigation in `RevolutionBarControl.js`
- All Corona routes are prefixed with `/Corona/` (see `index.js` routing)

**Corona Data Architecture**:
- `Service.js`: Centralized API client with `callCoronaService()` wrapper function
- Backend URL configured in `AppSettings.js` (`http://localhost:5678/revolution`)
- JWT token stored in sessionStorage using `AppSettings.TokenKey`
- All service calls follow pattern: `corona[Action][Entity]()` functions

**Form System Pattern**:
- **EditForm.js**: Core reusable form component with grid-based layout
- **EditField.js**: Field type router dispatching to specific field components
- **Field Types**: TextEditField, DoubleEditField, IntegerEditField, DateTimeEditField, ReferenceEditField
- Forms use `put_value`/`get_value` prop pattern for state management
- Error handling through `get_error` prop with field-specific validation

## Critical Development Workflows

**Local Development**:
```bash
npm start          # Standard React dev server (port 3000)
npm run cracostart # Alternative using CRACO config
npm run build      # Production build to /build directory
```

**Corona Service Integration**:
- Backend expected at `localhost:5678/revolution` (see `AppSettings.js`)
- Authentication via Google OAuth (`GoogleOAuthProvider` in `index.js`)
- All API calls include Bearer token when available
- Service responses follow `{success: boolean, message: string, form: string}` pattern

**Corona API Endpoints** (all POST requests to `http://localhost:5678/revolution`):
```
Authentication:
- /login/loginuser/     - Standard user login
- /login/loginusersso/  - SSO/Google login
- /login/createuser/    - User registration
- /login/senduser/      - Send verification code
- /login/confirmuser/   - Confirm verification code
- /login/passworduser/  - Set/reset password

Class Management:
- /classes/get/         - Get class list
- /classes/get/details  - Get specific class details
- /classes/put/         - Create/update class

Object Management:
- /objects/get/         - Get object details
- /objects/put/         - Create/update object
- /objects/edit/        - Edit object
- /objects/run/         - Execute object
- /objects/query/       - Query objects by class

User Management:
- /user/set_team/       - Set user team
```

## Component Conventions

**Corona Forms Pattern**:
```javascript
// Standard Corona form structure
export default function SomeForm(props) {
    let loc = useLocation();
    props = { ...props, ...loc.state };  // Merge route state
    
    const [request, setRequest] = useState({ ...props.data });
    const [error, setError] = useState({ success: false, message: "", errors: [] });
    
    // Always implement put_value/get_value pattern
    const put_value = (json_field_name, value) => {
        setRequest(prev => ({ ...prev, [json_field_name]: value }));
    };
}
```

**Grid Layout System**:
- Forms use CSS Grid with configurable `gridTemplateColumns`/`gridTemplateRows`
- Fields specify `row` and `column` positioning
- Standard gap: `12px` (configurable via `presentation.gap`)

**Material-UI Integration**:
- Uses `@mui/material` with custom theme (Jost font family)
- Paper components for form containers with elevation=3
- FontAwesome icons via `@fortawesome/react-fontawesome`

## File Organization Patterns

**Corona Directory Structure**:
- **Forms**: `[Entity][Action]Form.js` (e.g., `ObjectEditForm.js`, `ClassSearchForm.js`)
- **Field Components**: `[Type]EditField.js` for different data types
- **Shared Components**: `EditForm.js`, `EditField.js`, `ErrorControl.js`, `ObjectsList.js`
- **Infrastructure**: `Service.js`, `AppSettings.js`, `RevolutionBarControl.js`

**State Management**:
- No Redux - uses React `useState` and React Router `useLocation` for state passing
- Route state passed via `nav(route, { state: data })` pattern
- SessionStorage for authentication tokens only

## External Dependencies

**Key Integrations**:
- **Google OAuth**: Client ID hardcoded in `index.js`
- **Google Ads**: `GoogleAd` component with hardcoded publisher ID
- **Static Web App**: Azure deployment configuration in `staticwebapp.config.json`
- **CRACO**: Cross-Origin-Opener-Policy headers for OAuth (see `craco.config.js`)

**Notable Libraries**:
- `react-data-grid`: For Corona data tables
- `react-tabs`: Tab interface in HomeForm
- `react-datetime`: Date/time field components
- `query-string`: URL parameter parsing

## Corona-Specific Development Notes

When working on Corona components:
1. **Always** merge `useLocation().state` with props
2. **Always** implement `put_value`/`get_value` pattern for form fields
3. **Always** handle service errors with fallback forms
4. Use `coronaService` functions instead of direct fetch calls
5. Route navigation uses form redirection patterns (see Service.js success/error forms)

**Service Call Pattern**:
```javascript
// All corona service functions follow this pattern
const result = await coronaSomeAction(request, {
    successForm: "/Revolution/TargetPage",  // Route on success
    redoForm: "/Revolution/CurrentPage",    // Route on error
    redoMessage: "Custom error message",   // Error message
    storeToken: true                       // Store JWT token (auth endpoints only)
});
```

**Service Response Structure**:
```javascript
{
    success: boolean,     // Operation success status
    message: string,      // Success/error message
    form: string,         // Target route for navigation
    token?: string,       // JWT token (auth responses only)
    data?: object         // Response payload
}
```

**Common Corona Routes**:
- `/Corona/Home` - Dashboard with tabs for different object types
- `/Corona/ObjectEdit` - Generic object editor
- `/Corona/ClassEdit` - Class/schema editor  
- `/Corona/Login` - Authentication entry point