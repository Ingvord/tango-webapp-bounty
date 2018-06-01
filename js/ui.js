/**
 *
 * @author Igor Khokhriakov <igor.khokhriakov@hzg.de>
 * @since 6/1/18
 */
const ui = {
            rows:[
                {},
                {
                    gravity: 4,
                    cols:[
                        {},
                        {
                            borderless: true,
                            rows:[
                                {
                                    view: 'template',
                                    type: 'header',
                                    height: 80,
                                    template: '<h2>Suggest your new project name for TangoWebapp</h2>'
                                },
                                {
                                    id: 'data',
                                    view: 'datatable',
                                    select: true,
                                    editable: true,
                                    columns: [
                                        {id: 'id', hidden: true},
                                        {id: 'user', width: 250},
                                        {id: 'value', editor: 'text',fillspace: true},
                                        {id: 'remove', header: '',template:function(obj){return "<span class='webix_icon fa-trash remove'/>"}, width: 40}
                                    ],
                                    url: 'data.jsp',
                                    save:'data.jsp',
                                    onClick: {
                                        'remove':function(ev, obj){
                                            this.remove(obj.row);
                                        }
                                    }
                                },
                                {
                                    id:'frm',
                                    view: 'form',
                                    elements:[
                                        {
                                            view:'text',
                                            name: 'id',
                                            hidden: true
                                        },
                                        {
                                            view:'text',
                                            name: 'webix_operation',
                                            hidden: true
                                        },
                                        {
                                            view:'text',
                                            name: 'user',
                                            label: 'User',
                                            required:true,
                                            invalidMessage:"Can not be empty"
                                        },
                                        {
                                            view: 'text',
                                            name: 'value',
                                            label: 'Value',
                                            required:true,
                                            invalidMessage:"Can not be empty"
                                        },
                                        {
                                            view: 'button',
                                            name: 'submit',
                                            type: 'submit',
                                            value: 'Submit',
                                            click:function(){
                                                const form = this.getFormView();
                                                if(form.validate()) {
                                                    if(!form.elements['id'].getValue())
                                                        form.elements['id'].setValue(webix.uid());
                                                    form.elements['webix_operation'].setValue('insert');
                                                    // form.save();

                                                    webix.ajax().post("data.jsp", form.getValues(), function(response, xhr) {
                                                        $$('data').parse(xhr.json())
                                                    });
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {}
                    ]
                },
                {}
            ]
        };
