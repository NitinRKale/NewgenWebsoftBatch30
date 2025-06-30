
using NewgenWebsoftBatch30.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace NewgenWebsoftBatch30.DataContext
{
    public class DbInitializer
    {
        public static async Task Initialize(IServiceProvider serviceProvider, UserManager<ApplicationUser> userManager)
        {
            using (var context = new NewgenWebsoftDbContext(
                serviceProvider.GetRequiredService<DbContextOptions<NewgenWebsoftDbContext>>()))
            {
                context.Database.EnsureCreated();
 
                // Check and create test user if not exists
                if (await userManager.FindByNameAsync("testuser@test.com") == null)
                {
                    var user = new ApplicationUser
                    {
                        UserName = "testuser@test.com",
                        Email = "testuser@test.com",
                        EmailConfirmed = true
                    };
                    await userManager.CreateAsync(user, "Test@1234");
                }

                // Check and create admin user if not exists
                if (await userManager.FindByNameAsync("admin@test.com") == null)
                {
                    var admin = new ApplicationUser
                    {
                        UserName = "admin@test.com",
                        Email = "admin@test.com",
                        EmailConfirmed = true
                    };
                    await userManager.CreateAsync(admin, "Admin@1234");
                }

            }

        }

    }
}
