$(function () {
    if (!window.dlut) window.dlut = {};
    window.dlut = $.extend(window.dlut, {
        option: {}
    });
    dlut.option.mainMenu = {
        center: {
            "left": {
                url: "",
                force: true
            },
            "center": "",
            "right": ""
        },
        left: {
            "XX": {
                "left": {
                    url: "",
                    force: true
                },
                "center": "",
                "right": ""
            }
        },
        right: {
        }
    };
    dlut.option.ywjMenu = [
        {
            "unitName": "dzj",//单位名称
            "unitId": 1//单位Id
        }
    ]
});