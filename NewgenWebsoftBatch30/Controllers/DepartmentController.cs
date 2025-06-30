using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using NewgenWebsoftBatch30.DataContext;
using NewgenWebsoftBatch30.Models;
using System.Threading.Tasks;

namespace NewgenWebsoftBatch30.Controllers
{
    public class DepartmentController : Controller
    {
        private readonly NewgenWebsoftDbContext db;

        public DepartmentController (NewgenWebsoftDbContext dbContext)
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
        public async Task<IActionResult> Create(Department department)
        {
            if (ModelState.IsValid)
            {
                var result = await db.Departments.AddAsync(department);
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(department);
        }

        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            if (id>0)
            {
                var department = await db.Departments.FirstOrDefaultAsync(d => d.DeptId == id);
                if (department != null)
                {
                    return View(department);
                }
            }
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Edit(Department department)
        {
            if (ModelState.IsValid)
            {
                db.Departments.Update(department);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(department);
        }

        [HttpGet]
        public async Task<IActionResult> Details(int id)
        {
            if (id > 0)
            {
                var department = await db.Departments.FirstOrDefaultAsync(d => d.DeptId == id);

                if (department != null)
                {
                    return View(department);
                }
            }
            return NotFound();
        }

        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            if (id > 0)
            {
                var department = await db.Departments.FirstOrDefaultAsync(d => d.DeptId == id);

                if (department != null)
                {
                    return View(department);
                }
            }
            return NotFound();
        }

        [HttpPost, ActionName("Delete")]
        public async Task<IActionResult> DeleteDept(int id)
        {
            if (id > 0)
            {
                var department = await db.Departments.FirstOrDefaultAsync(d => d.DeptId == id);

                if (department != null)
                {
                    db.Departments.Remove(department);
                     db.SaveChanges();
                    return  RedirectToAction("Index");
                }
            }
            return NotFound();
        }
    }
}
