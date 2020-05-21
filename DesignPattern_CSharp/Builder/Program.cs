using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Builder
{
    public interface IBuilder
    {
        void BuildPartA();
        void BuildPartB();
        void BuildPartC();

    }

    public class ConcreteBuilder: IBuilder
    {
        private Product _product = new Product();
        public ConcreteBuilder()
        {
            this.Reset();
        }
        public void Reset()
        {
            this._product = new Product();
        }

        public void BuildPartA()
        {
            this._product.Add("PartA1");
        }
        public void BuildPartB()
        {
            this._product.Add("PartB1");
        }
        public void BuildPartC()
        {
            this._product.Add("PartC1");
        }
        public Product GetProduct()
        {
            Product result = this._product;
            this.Reset();
            return result;
        }

    }
    public class Product
    {
        private List<object> _parts = new List<object>();

        public void Add(string part)
        {
            this._parts.Add(part);
        }

        public string ListParts()
        {
            string str = string.Empty;

            for(int i = 0; i < this._parts.Count; i++)
            {
                str += this._parts[i] + ", ";
            }

            str = str.Remove(str.Length - 2);

            return "Product parts: " + str + "\n";
        }
    };

    public class Director
    {
        private IBuilder _builder;

        public IBuilder Builder
        {
            set { _builder = value; }
        }
        public void buildMinimalViableProduct()
        {
            this._builder.BuildPartA();
        }
        public void buildFullFeaturedProduct()
        {
            this._builder.BuildPartA();
            this._builder.BuildPartB();
            this._builder.BuildPartC();
        }
    };

    class Program
    {
        static void Main(string[] args)
        {
            var director = new Director();
            var builder = new ConcreteBuilder();
            director.Builder = builder;

            Console.WriteLine("Standard basic product");
            director.buildMinimalViableProduct();
            Console.WriteLine(builder.GetProduct().ListParts());

            Console.WriteLine("Standard full featured product:");
            director.buildFullFeaturedProduct();
            Console.WriteLine(builder.GetProduct().ListParts());

            Console.WriteLine("Custom product:");
            builder.BuildPartA();
            builder.BuildPartC();
            Console.Write(builder.GetProduct().ListParts());
        }
    }
}
