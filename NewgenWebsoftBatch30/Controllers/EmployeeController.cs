using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NewgenWebsoftBatch30.DataContext;
using NewgenWebsoftBatch30.Models;

namespace NewgenWebsoftBatch30.Controllers
{
    public class EmployeeController : Controller
    {
        private readonly NewgenWebsoftDbContext db;

        public EmployeeController(NewgenWebsoftDbContext dbContext)
        {
            this.db = dbContext;
        }

        public IActionResult Index()
        {
            //var EmployeelList= await db.Employees.Include(d=> d.Department).ToListAsync();
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> GetEmployees()
        {
            var employees = await db.Employees
                .Include(e => e.Department)
                .Select(e => new
                {
                    e.EmpId,
                    e.EmpFirstName,
                    e.EmpLastName,
                    e.EmailId,
                    //BirthDate = e.BirthDate.HasValue ? e.BirthDate.Value.ToString("yyyy-MM-dd") : "",
                    BirthDate = e.BirthDate.HasValue ? e.BirthDate.Value.ToString("dd-MM-yyyy") : "",
                    e.EmpGender,
                    e.EmpPhoneNumber,
                    e.Salary,
                    EmpStatus = e.EmpStatus ? "Active" : "Inactive",
                    Department = e.Department != null ? e.Department.DeptName : ""
                })
                .ToListAsync();

            return Json(new { data = employees });
        }

        [HttpGet]
        public async Task<IActionResult> Create()
        {
            ViewBag.Departments = await db.Departments.ToListAsync();
            return View();
        }

        //[HttpPost]
        //public async Task<IActionResult> Create(Employee employee)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return View(employee);
        //    }

        //    await db.Employees.AddAsync(employee);
        //    db.SaveChanges();
        //    return RedirectToAction("Index");
        //}

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([FromBody] Employee employee)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return Json(new { success = "Fail", message = "Error creating employee." });
                }

                await db.Employees.AddAsync(employee);
                await db.SaveChangesAsync();

                //return Json(new { success = true, message = "Employee created successfully!" });
                return Json(new { success = true, result = "Saved", message = "Employee created successfully.", ErrorMessage = "", redirectTo = Url.Action("Index", "Employee") });
            }
            catch (Exception ex)
            {
                return Json(new { success = "Error", ErrorMessage = ex.Message });
            }
        }

        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            if (id > 0)
            {
                var Employee = await db.Employees.FindAsync(id);
                ViewBag.Departments = await db.Departments.ToListAsync();
                return View(Employee);
            }
            return NotFound();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit([FromBody] Employee employee)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    db.Employees.Update(employee);
                    await db.SaveChangesAsync();
                    //return RedirectToAction("Index");
                    return Json(new { success = true, result = "Updated", message = "Employee updated successfully.", 
                        ErrorMessage = "", redirectTo = Url.Action("Index", "Employee") });
                }
                ViewBag.Departments = await db.Departments.ToListAsync();
                return View(employee);
            }
            catch (Exception ex)
            {
                return Json(new { success = "Error", ErrorMessage = ex.Message });
            }           
        }

        [HttpGet]
        public async Task<IActionResult> Details(int id)
        {
            if (id > 0)
            {
                var Employee = await db.Employees.Include(d => d.Department).FirstOrDefaultAsync(e => e.EmpId == id);
                return View(Employee);
            }
            return NotFound();
        }

        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            if (id > 0)
            {
                var Employee = await db.Employees.Include(d => d.Department).FirstOrDefaultAsync(e => e.EmpId == id);
                return View(Employee);
            }
            return NotFound();
        }

        //[HttpPost, ActionName("Delete")]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirm(int empId)
        {
            try
            {
                if (empId <= 0)
                {
                    return Json(new { success = "Fail", message = "Error encountered while delete employee." });
                }

                var employee = await db.Employees.FirstOrDefaultAsync(d => d.EmpId == empId);

                if (employee != null)
                {
                    db.Employees.Remove(employee);
                    db.SaveChanges();
                    return Json(new { success = "True", result = "Deleted", message = "Employee deleted successfully.", 
                                        ErrorMessage = "", redirectTo = Url.Action("Index", "Employee") });
                }
                return Json(new { success = "Fail", message = "Employee details was not found" });
            }
            catch (Exception ex)
            {
                return Json(new { success = "Error", ErrorMessage = ex.Message });
            }
        }
    }
}
