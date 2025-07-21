Ext.define('SYNO.Changepanelsize.MainPanel', {
    extend: 'SYNO.ux.Panel',
    
    constructor: function(config) {
        var me = this;
        
        me.hddBayStore = Ext.create('Ext.data.Store', {
            fields: ['value', 'text'],
            data: [
                {value: 'RACK_0_Bay', text: 'RACK_0_Bay'},
                {value: 'RACK_2_Bay', text: 'RACK_2_Bay'},
                {value: 'RACK_4_Bay', text: 'RACK_4_Bay'},
                {value: 'RACK_8_Bay', text: 'RACK_8_Bay'},
                {value: 'RACK_10_Bay', text: 'RACK_10_Bay'},
                {value: 'RACK_12_Bay', text: 'RACK_12_Bay'},
                {value: 'RACK_12_Bay_2', text: 'RACK_12_Bay_2'},
                {value: 'RACK_16_Bay', text: 'RACK_16_Bay'},
                {value: 'RACK_20_Bay', text: 'RACK_20_Bay'},
                {value: 'RACK_24_Bay', text: 'RACK_24_Bay'},
                {value: 'RACK_60_Bay', text: 'RACK_60_Bay'},
                {value: 'TOWER_1_Bay', text: 'TOWER_1_Bay'},
                {value: 'TOWER_2_Bay', text: 'TOWER_2_Bay'},
                {value: 'TOWER_4_Bay', text: 'TOWER_4_Bay'},
                {value: 'TOWER_4_Bay_J', text: 'TOWER_4_Bay_J'},
                {value: 'TOWER_4_Bay_S', text: 'TOWER_4_Bay_S'},
                {value: 'TOWER_5_Bay', text: 'TOWER_5_Bay'},
                {value: 'TOWER_6_Bay', text: 'TOWER_6_Bay'},
                {value: 'TOWER_8_Bay', text: 'TOWER_8_Bay'},
                {value: 'TOWER_12_Bay', text: 'TOWER_12_Bay'}
            ]
        });
        
        var panelConfig = {
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'form',
                itemId: 'changePanelForm',
                flex: 1,
                padding: 20,
                title: 'Panel Configuration',
                cls: 'form-section',
                items: [{
                    xtype: 'combo',
                    fieldLabel: 'Panel Type',
                    name: 'panel_type',
                    store: me.hddBayStore,
                    displayField: 'text',
                    valueField: 'value',
                    editable: false,
                    width: 300,
                    listeners: {
                        select: function(combo, record) {
                            me.updatePreview(record.get('value'));
                        }
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'SSD Bay',
                    name: 'ssd_bay',
                    regex: /^\d+X\d+$/,
                    regexText: 'SSD Bay format should be like: 2X1, 4X2 etc.',
                    width: 300
                }],
                buttons: [{
                    text: 'Apply',
                    handler: me.onApply,
                    scope: me
                }]
            }, {
                xtype: 'panel',
                itemId: 'previewPanel',
                flex: 1,
                padding: 20,
                title: 'Panel Preview',
                cls: 'preview-panel',
                html: '<div id="previewContainer" style="text-align: center; padding: 40px;">' +
                      '<div style="color: #666; font-size: 16px;">' +
                      '<i class="fas fa-image" style="font-size: 48px; color: #ddd; margin-bottom: 20px;"></i><br>' +
                      'Select a panel type from the dropdown to see the preview' +
                      '</div></div>'
            }]
        };
        
        Ext.apply(config, panelConfig);
        me.callParent([config]);
    },
    
    updatePreview: function(panelType) {
        var me = this;
        var previewContainer = Ext.get('previewContainer');
        
        if (previewContainer) {
            // 패널 타입에 따른 이미지 매핑 (실제 파일명과 매칭)
            var imageMap = {
                'RACK_0_Bay': 'images/model_0bay_rack.png',
                'RACK_2_Bay': 'images/model_2bay_rack.png', 
                'RACK_4_Bay': 'images/model_4bay_rack.png',
                'RACK_8_Bay': 'images/model_8bay_rack.png',
                'RACK_10_Bay': 'images/model_10bay_rack.png',
                'RACK_12_Bay': 'images/model_12bay_rack.png',
                'RACK_12_Bay_2': 'images/model_12bay_2_rack.png',
                'RACK_16_Bay': 'images/model_16bay_rack.png',
                'RACK_20_Bay': 'images/model_20bay_rack.png',
                'RACK_24_Bay': 'images/model_24bay_rack.png',
                'RACK_60_Bay': 'images/model_60bay_rack.png',
                'TOWER_1_Bay': 'images/model_1bay_tower.png',
                'TOWER_2_Bay': 'images/model_2bay_tower.png',
                'TOWER_4_Bay': 'images/model_4bay_tower.png',
                'TOWER_4_Bay_J': 'images/model_4bay_tower_J.png',
                'TOWER_4_Bay_S': 'images/model_4bay_tower_Slim.png',
                'TOWER_5_Bay': 'images/model_5bay_tower.png',
                'TOWER_6_Bay': 'images/model_6bay_tower.png',
                'TOWER_8_Bay': 'images/model_8bay_tower.png',
                'TOWER_12_Bay': 'images/model_12bay_tower.png'
            };
            
            var imagePath = imageMap[panelType] || 'images/model_4bay_tower.png';
            
            // 패널 타입에 따른 설명 추가
            var description = me.getPanelDescription(panelType);
            
            // 미리보기 HTML 생성
            var previewHtml = '<div style="text-align: center; padding: 20px;">' +
                '<h3 style="color: #0078d7; margin-bottom: 15px; font-size: 18px;">' + panelType + '</h3>' +
                '<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 15px; border: 1px solid #e9ecef;">' +
                '<img src="' + imagePath + '" alt="' + panelType + '" ' +
                'style="max-width: 100%; max-height: 200px; border: 1px solid #ddd; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); background: white;" ' +
                'onerror="this.src=\'images/model_4bay_tower.png\'; this.alt=\'Preview not available\';" />' +
                '</div>' +
                '<div style="background: #e7f3ff; padding: 10px; border-radius: 6px; border-left: 4px solid #0078d7;">' +
                '<p style="color: #333; font-size: 14px; margin: 0; line-height: 1.4;">' + description + '</p>' +
                '</div>' +
                '</div>';
            
            previewContainer.setHtml(previewHtml);
        }
    },
    
    getPanelDescription: function(panelType) {
        var descriptions = {
            'RACK_0_Bay': '베이가 없는 랙마운트 타입',
            'RACK_2_Bay': '2베이 랙마운트 타입',
            'RACK_4_Bay': '4베이 랙마운트 타입',
            'RACK_8_Bay': '8베이 랙마운트 타입',
            'RACK_10_Bay': '10베이 랙마운트 타입',
            'RACK_12_Bay': '12베이 랙마운트 타입',
            'RACK_12_Bay_2': '12베이 랙마운트 타입 (변형)',
            'RACK_16_Bay': '16베이 랙마운트 타입',
            'RACK_20_Bay': '20베이 랙마운트 타입',
            'RACK_24_Bay': '24베이 랙마운트 타입',
            'RACK_60_Bay': '60베이 대용량 랙마운트 타입',
            'TOWER_1_Bay': '1베이 타워 타입',
            'TOWER_2_Bay': '2베이 타워 타입',
            'TOWER_4_Bay': '4베이 타워 타입',
            'TOWER_4_Bay_J': '4베이 타워 타입 (J 시리즈)',
            'TOWER_4_Bay_S': '4베이 타워 타입 (S 시리즈)',
            'TOWER_5_Bay': '5베이 타워 타입',
            'TOWER_6_Bay': '6베이 타워 타입',
            'TOWER_8_Bay': '8베이 타워 타입',
            'TOWER_12_Bay': '12베이 타워 타입'
        };
        
        return descriptions[panelType] || '패널 타입 설명';
    },
    
    onApply: function() {
        var me = this;
        var form = me.down('#changePanelForm').getForm();
        
        if (form.isValid()) {
            var values = form.getValues();
            
            Ext.Ajax.request({
                url: '/webman/3rdparty/Changepanelsize/api',
                method: 'POST',
                jsonData: values,
                success: function(response) {
                    var result = Ext.decode(response.responseText);
                    if (result.success) {
                        SYNO.ux.NotificationMgr.fireInfo({
                            text: result.message
                        });
                    } else {
                        SYNO.ux.NotificationMgr.fireError({
                            text: result.message
                        });
                    }
                },
                failure: function() {
                    SYNO.ux.NotificationMgr.fireError({
                        text: 'Network error occurred'
                    });
                }
            });
        }
    }
});

Ext.define('SYNO.Changepanelsize.Application', {
    extend: 'SYNO.PageApplication',
    
    appWindowName: 'SYNO.Changepanelsize.MainPanel',
    
    constructor: function() {
        this.callParent(arguments);
    }
});

