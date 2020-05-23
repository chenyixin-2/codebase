lg(GetScriptName());

class MyClass {
    static property = "hello";
    static staticMethod = () => { lg("static method"); }
}

lg(MyClass.property);
MyClass.staticMethod();

// inherite from super class
class DerivedMyClass extends MyClass{}
lg(DerivedMyClass.property);
DerivedMyClass.staticMethod();