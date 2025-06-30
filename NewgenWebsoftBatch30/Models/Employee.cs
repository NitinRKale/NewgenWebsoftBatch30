using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NewgenWebsoftBatch30.Models
{
    public class Employee
    {
        [Key]
        public int EmpId { get; set; }

        [Required, StringLength(30)]
        [Display(Name = "First Name")]
        public string EmpFirstName { get; set; }

        [Required, StringLength(50)]
        [Display(Name = "Last Name")]
        public string EmpLastName { get; set; }

        [Required, StringLength(50)]
        [Display(Name = "Email Address")]
        public string EmailId { get; set; }

        [Required]
        public DateTime? BirthDate { get; set; }

        [Required, StringLength(15)]
        [Display(Name = "Gender")]
        public string EmpGender { get; set; }

        [Required, StringLength(15)]
        [Display(Name = "Phone Number")]
        public string EmpPhoneNumber { get; set; }

        [Required, Range(0, int.MaxValue)]
        public int Salary { get; set; }

        public bool EmpStatus { get; set; }

        [ForeignKey("Department")]
        [Required(ErrorMessage = "Please Select Department")]
        public int DeptId { get; set; }

        public Department? Department { get; set; }


    }
}
