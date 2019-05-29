window.chartOptionList = {
    "default": function(option){
        return option;
    },
    "pieOption": function (option) {
        option.textStyle = {
            color: "red",
            fontSize: 25
        };
        return option;
    }
};