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
                                    type: 'section',
                                    template: 'BOUNTY: a new project name for TangoWebapp'
                                },
                                {
                                    id: 'data',
                                    view: 'datatable',
                                    editable: true,
                                    columns: [
                                        {id: 'id', hidden: true},
                                        {id: 'user', width: 250},
                                        {id: 'value', editor: 'text',fillspace: true}
                                    ],
                                    url: 'data.jsp',
                                    save:'data.jsp'
                                },
                                {
                                    id:'frm',
                                    view: 'form',
                                    elements:[
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
                                                    form.save();
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
