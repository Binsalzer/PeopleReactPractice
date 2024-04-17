using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeopleReactPractice.Data
{
    public class PeopleRepo
    {
        private readonly string _connection;

        public PeopleRepo(string connection)
        {
            _connection = connection;
        }

        public List<Person> GetAllPeople()
        {
            using var context = new PeopleDataContext(_connection);
            return context.People.ToList();
        }

        public void AddPerson(Person person)
        {
            using var context = new PeopleDataContext(_connection);
            context.People.Add(person);
            context.SaveChanges();
        }

        public void Delete(int id)
        {
            using var context = new PeopleDataContext(_connection);
            context.People.Remove(context.People.FirstOrDefault(p => p.Id == id));
            context.SaveChanges();
        }

        public void DeleteAllChecked(List<int> ids)
        {
            using var context = new PeopleDataContext(_connection);
            foreach(int id in ids)
            {
                context.People.Remove(context.People.FirstOrDefault(p => p.Id == id));
            }
            context.SaveChanges();
        }

        public Person GetPersonById(int id)
        {
            using var context = new PeopleDataContext(_connection);
            return context.People.FirstOrDefault(p => p.Id == id);
        }

        public void Update(Person person)
        {
            using var context = new PeopleDataContext(_connection);
            context.Entry(person).State = EntityState.Modified;
            context.SaveChanges();
        }
    }
}
