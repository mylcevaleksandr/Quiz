(function () {
    const Form = {
        agreeElement: null,
        processElement: null,
        fields: [
            {
                name: "name",
                id: "name",
                label: "Имя",
                element: null,
                regex: /^[А-Я][а-я]+\s*$/,
                valid: false,
            },
            {
                name: "lastName",
                id: "last-name",
                label: "Фамилия",
                element: null,
                regex: /^[А-Я][а-я]+\s*$/,
                valid: false,
            },
            {
                name: "email",
                id: "email",
                label: "Электронная почта",
                element: null,
                regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                valid: false,
            },
        ],
        init() {
            const that = this;
            this.fields.forEach(item => {
                item.element = document.getElementById(item.id);
                item.element.onchange = function () {
                    that.validateField.call(that, item, this);
                };
            });
            this.processElement = document.getElementById("process");
            this.processElement.onclick = function () {
                that.processForm();
            };
            this.agreeElement = document.getElementById("agree");
            this.agreeElement.onchange = function () {
                that.validateForm();
            };
        },
        validateField(field, element) {
            const parent = element.parentNode;
            const labelElement = parent.children[1];
            if (!element.value || !element.value.match(field.regex)) {
                parent.style.borderColor = "red";
                labelElement.innerText = labelElement.innerText + " Русскими буквами!";
                field.valid = false;
            } else {
                labelElement.innerText = field.label;
                parent.removeAttribute("style");
                field.valid = true;
            }
            this.validateForm();
        },
        validateForm() {

            const validForm = this.fields.every(item => item.valid);
            const isValid = this.agreeElement.checked && validForm;
            if (isValid) {
                this.processElement.removeAttribute("disabled");
            } else {
                this.processElement.setAttribute("disabled", "disabled");
            }
            return isValid;
        },
        processForm() {
            if (this.validateForm()) {
                let paramString = "";
                this.fields.forEach(item => {
                    sessionStorage.setItem(item.name, item.element.value);

                    paramString += (!paramString ? "?" : "&") + item.name + "=" + item.element.value;
                });


                location.href = "choice.html";
            }
        }
    };
    Form.init();

})();