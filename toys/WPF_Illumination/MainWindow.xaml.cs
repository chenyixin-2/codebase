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

namespace WPF_Illumination
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    
    public class User : INotifyPropertyChanged
    {
        private string name;

        public event PropertyChangedEventHandler PropertyChanged;
        public void NotifyPropertyChanged(string propName)
        {
            if(this.PropertyChanged != null) {
                this.PropertyChanged(this, new PropertyChangedEventArgs(propName));
            }
        }
        public string Name {
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
    }
    public partial class MainWindow : Window
    {
        private int count = 0;
        private List<User> users = new List<User>();

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
            lbUsers.ItemsSource = users;
        }

        private void pnlMainGrid_MouseUp(object sender, MouseButtonEventArgs e)
        {
            //MessageBox.Show("You clicked me at " + e.GetPosition(this).ToString());
            count++;
            this.Title = "Title " + count.ToString();
        }

        private void btnUpdateSource_Click(object sender, RoutedEventArgs e)
        {
            BindingExpression binding = txtWindowTitle.GetBindingExpression(TextBox.TextProperty);
            binding.UpdateSource();
        }

        private void btnAddUser_Click(object sender, RoutedEventArgs e)
        {
            users.Add(new User() { Name = "New user" });
        }

        private void btnChangeUser_Click(object sender, RoutedEventArgs e)
        {
            if (lbUsers.SelectedItem != null)
                (lbUsers.SelectedItem as User).Name = "Random Name";
        }

        private void btnDeleteUser_Click(object sender, RoutedEventArgs e)
        {
            if (lbUsers.SelectedItem != null)
                users.Remove(lbUsers.SelectedItem as User);
        }
    }
}
