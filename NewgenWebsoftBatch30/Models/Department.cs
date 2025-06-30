using System.ComponentModel.DataAnnotations;

namespace NewgenWebsoftBatch30.Models
{
    public class Department
    {
        [Key]
        public int DeptId { get; set; }

        [Required]
        public string DeptName { get; set; }

    }
}
