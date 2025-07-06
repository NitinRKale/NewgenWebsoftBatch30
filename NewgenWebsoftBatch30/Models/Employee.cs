using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NewgenWebsoftBatch30.Models
{
    public class Employee
    {
        [Key]
        public int EmpId { get; set; }

        [Required(ErrorMessage = "Please Enter First Name"), StringLength(30)]
        [Display(Name = "First Name")]
        public string EmpFirstName { get; set; }

        [Required(ErrorMessage = "Please Enter Last Name"), StringLength(50)]
        [Display(Name = "Last Name")]
        public string EmpLastName { get; set; }

        [Required(ErrorMessage = "Please Enter Email"), StringLength(50)]
        [Display(Name = "Email Address")]
        public string EmailId { get; set; }

        [Required(ErrorMessage = "Please Select BirthDate")]
        public DateTime? BirthDate { get; set; }

        [Required(ErrorMessage ="Please Select Gender"), StringLength(15)]
        [Display(Name = "Gender")]
        public string EmpGender { get; set; }

        [Required(ErrorMessage = "Please Enter Phone Number"), StringLength(15)]
        [Display(Name = "Phone Number")]
        public string EmpPhoneNumber { get; set; }

        [Required(ErrorMessage = "Please Enter Salary"), Range(0, int.MaxValue)]
        public int Salary { get; set; }

        [Required(ErrorMessage = "Please Select Status")]
        public bool EmpStatus { get; set; }

        [ForeignKey("Department")]
        [Required(ErrorMessage = "Please Select Department")]
        public int DeptId { get; set; }

        public Department? Department { get; set; }

        //Welcome to Newgen Websoft Batch 30


    }
}
