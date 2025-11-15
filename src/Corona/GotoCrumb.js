
import { coronaEditObject, coronaUpdateCurrent, coronaSetCurrent } from './Service.js';

export default async function GotoCrumb(nav, breadcrumb, onNavigate) {

    if (breadcrumb.type == "object") {
        let response = {};
        coronaSetCurrent(breadcrumb);

        response = await coronaEditObject({ include_children:"true", data: { class_name: breadcrumb.navigation.data.object.class_name, object_id:breadcrumb.navigation.data.object.object_id } }, {
            successForm: '/Corona/ObjectEdit',
            redoForm: '/Corona/ObjectEdit',
            redoMessage: 'Cannot edit.'
        });

        if (response.success) {
            breadcrumb.navigation.data = response.data;
            console.log( { 'navigating to object' : breadcrumb, form:response.form });
            coronaUpdateCurrent(breadcrumb);
            if (onNavigate) {
                onNavigate(response);
            } else {
                nav(response.form);
            }
        }

    }
    else {
        coronaSetCurrent(breadcrumb);
        nav(breadcrumb.path);
    }
}
