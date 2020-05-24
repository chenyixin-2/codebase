using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

using System.ComponentModel;
using System.Collections.ObjectModel;

using System.Diagnostics; // Debugger

namespace WPF_Illumination
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    
    // data binding
    public class User : INotifyPropertyChanged
    {
        private string name;
        public string Name
        {
            get { return this.name; }
            set
            {
                if (this.name != value)
                {
                    this.name = value;
                    this.NotifyPropertyChanged("Name");
                }
            }
        }
        public event PropertyChangedEventHandler PropertyChanged;
        public void NotifyPropertyChanged(string propName)
        {
            if (this.PropertyChanged != null)
            {
                this.PropertyChanged(this, new PropertyChangedEventArgs(propName));
            }
        }
    }

    // value converter
    public class YesNoToBooleanConverter : IValueConverter
    {
        public object Convert(object value, Type targetType, object parameter, System.Globalization.CultureInfo culture)
       {
            switch(value.ToString().ToLower())
            {
                case "yes":
                case "our":
                    return true;
                case "no":
                case "non":
                    return false;
            }
            return false;
        }
        public object ConvertBack(object value, Type targetType, object parameter, System.Globalization.CultureInfo culture)
        {
            if(value is bool)
            {
                if ((bool)value == true)
                    return "yes";
                else
                    return "no";
            }
            return "no";
        }
    }
    public class DebugDummyConverter : IValueConverter
    {
        public object Convert(object value, Type targetType, object parameter, System.Globalization.CultureInfo culture)
        {
            //Debugger.Break();
            return value;
        }

        public object ConvertBack(object value, Type targetType, object parameter, System.Globalization.CultureInfo culture)
        {
            //Debugger.Break();
            return value;
        }
    }
    public partial class MainWindow : Window
    {
        private int count = 0;

        // for Notification sample
        private ObservableCollection<User> users = new ObservableCollection<User>();
        //private List<User> users = new List<User>();

        public MainWindow()
        {
            InitializeComponent();

            pnlMainGrid.MouseUp += new MouseButtonEventHandler(pnlMainGrid_MouseUp);

            btnAddUser.Click += new RoutedEventHandler(btnAddUser_Click);
            btnDeleteUser.Click += new RoutedEventHandler(btnDeleteUser_Click);
            btnChangeUser.Click += new RoutedEventHandler(btnChangeUser_Click);

            // set binding manually
            Binding binding = new Binding("Text");
            binding.Source = txtValue2;
            lblValue.SetBinding(TextBlock.TextProperty, binding); // lblValue is the "guy" for bindding

            // update trigger is needed
            this.DataContext = this; // we assign the "this" reference to the DataContext, which basically just tells the Window that we want itself to be the data context.

            // user demo : List as user
            users.Add(new User() { Name = "John Doe" });
            users.Add(new User() { Name = "Jane Doe" });
            // ItemsSource for ListBox
            lbUsers.ItemsSource = users;
        }

        private void pnlMainGrid_MouseUp(object sender, MouseButtonEventArgs e)
        {
            //MessageBox.Show("You clicked me at " + e.GetPosition(this).ToString());
            count++;
            this.Title = "Title " + count.ToString();
            
            e.Handled = true; //https://stackoverflow.com/questions/6034956/mousedown-event-firing-twice-wpf
        }

        private void btnUpdateSource_Click(object sender, RoutedEventArgs e)
        {
            BindingExpression binding = txtWindowTitle.GetBindingExpression(TextBox.TextProperty);
            binding.UpdateSource();

            e.Handled = true;
        }

        private void btnAddUser_Click(object sender, RoutedEventArgs e)
        {
            users.Add(new User() { Name = "New user" });

            e.Handled = true;
        }

        private void btnChangeUser_Click(object sender, RoutedEventArgs e)
        {
            if (lbUsers.SelectedItem != null)
                (lbUsers.SelectedItem as User).Name = "Random Name";

            e.Handled = true;
        }

        private void btnDeleteUser_Click(object sender, RoutedEventArgs e)
        {
            if (lbUsers.SelectedItem != null)
                users.Remove(lbUsers.SelectedItem as User);

            e.Handled = true;
        }

        private void btnClickMe_Click(object sender, RoutedEventArgs e)
        {
            lbResult.Items.Add(pnlMain.FindResource("strPanel").ToString());
            lbResult.Items.Add(this.FindResource("strHelloWorld").ToString());
            lbResult.Items.Add(Application.Current.FindResource("strApp").ToString());
        }
    }
}
