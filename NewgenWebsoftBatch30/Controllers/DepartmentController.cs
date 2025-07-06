using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NewgenWebsoftBatch30.DataContext;
using NewgenWebsoftBatch30.Models;
using System.Threading.Tasks;

namespace NewgenWebsoftBatch30.Controllers
{
    public class DeleteRequest
    {
        public int Id { get; set; }
    }

    public class DepartmentController : Controller
    {
        private readonly NewgenWebsoftDbContext db;

        public DepartmentController(NewgenWebsoftDbContext dbContext)
        {
            this.db = dbContext;
        }

        public async Task<IActionResult> Index()
        {
            var deptList = await db.Departments.ToListAsync();
            return View(deptList);
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([FromForm] Department department)
        {
            if (!ModelState.IsValid)
            {
                return Json(new { success = false, message = "Error creating department." });
            }
            try
            {
                await db.Departments.AddAsync(department);
                await db.SaveChangesAsync();
                return Json(new
                {
                    success = true,
                    message = "Department created successfully.",
                    redirectTo = Url.Action("Index", "Department")
                });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "An error occurred: " + ex.Message });
            }
        }

        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            if (id <= 0) return NotFound();
            var department = await db.Departments.FirstOrDefaultAsync(d => d.DeptId == id);
            if (department == null) return NotFound();
            return View(department);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit([FromForm] Department department)
        {
            if (!ModelState.IsValid)
            {
                return Json(new { success = false, message = "Error updating department." });
            }
            try
            {
                var existing = await db.Departments.FindAsync(department.DeptId);
                if (existing == null) return NotFound();

                existing.DeptName = department.DeptName;
                db.Departments.Update(existing);
                await db.SaveChangesAsync();
                return Json(new
                {
                    success = true,
                    message = "Department updated successfully.",
                    redirectTo = Url.Action("Index", "Department")
                });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "An error occurred: " + ex.Message });
            }
        }

        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            if (id <= 0) return NotFound();
            var department = await db.Departments.FirstOrDefaultAsync(d => d.DeptId == id);
            if (department == null) return NotFound();
            return View(department);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteDept([FromBody] DeleteRequest request)
        {
            if (request == null || request.Id <= 0)
            {
                return Json(new { success = false, message = "Invalid department ID." });
            }
            try
            {
                var department = await db.Departments.FirstOrDefaultAsync(d => d.DeptId == request.Id);
                if (department == null)
                {
                    return Json(new { success = false, message = "Department not found." });
                }
                db.Departments.Remove(department);
                await db.SaveChangesAsync();
                return Json(new
                {
                    success = true,
                    message = "Department deleted successfully.",
                    redirectTo = Url.Action("Index", "Department")
                });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "An error occurred: " + ex.Message });
            }
        }

        [HttpGet]
        public async Task<IActionResult> Details(int id)
        {
            if (id <= 0) return NotFound();
            var department = await db.Departments.FirstOrDefaultAsync(d => d.DeptId == id);
            if (department == null) return NotFound();
            return View(department);
        }
    }
}