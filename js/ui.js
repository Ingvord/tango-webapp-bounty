/**
 *
 * @author Igor Khokhriakov <igor.khokhriakov@hzg.de>
 * @since 6/1/18
 */
const ui = {
    rows: [
        {
            borderless: true,
            template: '<img width="25%" style="display: block; margin: 0 auto" src="images/tango_in_color.png">'
        },
        {
            gravity: 4,
            cols: [
                {},
                {
                    borderless: true,
                    rows: [
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
                                {id: 'id', sort: 'int', hidden: true},
                                {id: 'user', width: 250},
                                {id: 'value', header: 'Suggestion', editor: 'text', fillspace: true},
                                {
                                    id: 'remove', header: '', template: function (obj) {
                                        return "<span class='webix_icon fa-trash remove'/>"
                                    }, width: 40
                                },
                                {id: 'votes', editor: 'text', sort: 'int', hidden: true, width: 80}
                            ],
                            url: 'data.jsp',
                            save: 'data.jsp',
                            onClick: {
                                'remove': function (ev, obj) {
                                    this.remove(obj.row);
                                }
                            }
                        },
                        {
                            id: 'frm',
                            view: 'form',
                            elements: [
                                {
                                    view: 'text',
                                    name: 'user',
                                    label: 'User',
                                    required: true,
                                    labelWidth: 100,
                                    invalidMessage: "Can not be empty"
                                },
                                {
                                    view: 'text',
                                    name: 'value',
                                    label: 'Suggestion',
                                    labelWidth: 100,
                                    required: true,
                                    invalidMessage: "Can not be empty"
                                },
                                {
                                    view: 'button',
                                    name: 'submit',
                                    type: 'submit',
                                    value: 'Submit',
                                    click: function () {
                                        const form = this.getFormView();
                                        if (form.validate()) {
                                            webix.ajax().post("data.jsp", webix.extend(form.getValues(),
                                                {
                                                    id: webix.uid(),
                                                    votes: 0,
                                                    webix_operation: 'insert'
                                                }), function (response, xhr) {
                                                    $$('data').parse(xhr.json());
                                                    form.clear();
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
