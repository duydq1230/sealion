window.nlpElements.directive('sentiments', function ($filter) {
    return {
        templateUrl: './static/app/directives/sentiment/dom.html',
        restrict: 'AE',
        scope: {
            'ngModel': '=',
            "onaftersave": "&"
        },
        controller: function ($scope) {
            $scope.aspects = [
                {value: "ACCOUNT", text: 'ACCOUNT'},
                {value: "CARD", text: 'CARD'},
                {value: "CUSTOMER SUPPORT", text: 'CUSTOMER SUPPORT'},
                {value: "INTEREST RATE", text: 'INTEREST RATE'},
                {value: "INTERNET BANKING", text: 'INTERNET BANKING'},
                {value: "LOAN", text: 'LOAN'},
                {value: "MONEY TRANSFER", text: 'MONEY TRANSFER'},
                {value: "PAYMENT", text: 'PAYMENT'},
                {value: "DISCOUNT", text: 'DISCOUNT'},
                {value: "PROMOTION", text: 'PROMOTION'},
                {value: "SAVING", text: 'SAVING'},
                {value: "SECURITY", text: 'SECURITY'},
                {value: "TRADEMARK", text: 'TRADEMARK'},
                {value: "OTHER", text: 'OTHER'},
            ];

            $scope.save = function () {
                $scope.onaftersave();
            };

            $scope.validate = function (field, data) {
                if (field == "aspect") {
                    if (!data) {
                        return "Blank is not valid value.";
                    }
                    var isValid = !_.chain(this.ngModel).pluck("aspect").initial().contains(data).value();
                    if (!isValid) {
                        return "It is not allowed duplicated value.";
                    }
                }

                if (field == "polarity") {
                    if (!data) {
                        return "Blank is not valid value.";
                    }
                }
            };
            $scope.showAspect = function (sentiment) {
                var selected = [];
                if (sentiment.aspect) {
                    selected = $filter('filter')($scope.aspects, {value: sentiment.aspect});
                }
                return selected.length ? selected[0].text : 'Not set';
            };

            $scope.polarities = [
                {value: "POSITIVE", text: 'POSITIVE 👍'},
                {value: "NEUTRAL", text: 'NEUTRAL'},
                {value: "NEGATIVE", text: 'NEGATIVE 👎'}
            ];

            $scope.showPolarity = function (sentiment) {
                var selected = [];
                if (sentiment.polarity) {
                    selected = $filter('filter')($scope.polarities, {value: sentiment.polarity});
                }
                return selected.length ? selected[0].text : 'Not set';
            };

            $scope.add = function () {
                $scope.inserted = {
                    id: $scope.ngModel.length + 1,
                    aspect: null,
                    polarity: null
                };
                $scope.ngModel.push($scope.inserted);
            };

            $scope.delete = function (index) {
                $scope.ngModel.splice(index, 1);
                $scope.save();
            }
        }
    }
});
