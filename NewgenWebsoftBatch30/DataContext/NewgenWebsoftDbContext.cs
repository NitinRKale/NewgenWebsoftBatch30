using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using NewgenWebsoftBatch30.Models;

namespace NewgenWebsoftBatch30.DataContext
{
    public class NewgenWebsoftDbContext: IdentityDbContext<ApplicationUser>
    {
        public NewgenWebsoftDbContext(DbContextOptions<NewgenWebsoftDbContext> options) : base(options)
        {

        }

        public DbSet<Department> Departments { get; set; }  

        public DbSet<Employee> Employees { get; set; }

    }
}
