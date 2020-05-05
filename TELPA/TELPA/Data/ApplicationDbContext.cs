﻿using TELPA.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TELPA.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Invite> Invites { get; set; }
        public DbSet<Topic> Topics { get; set; }
        public DbSet<TopicLink> TopicLinks { get; set; }
        public DbSet<LearnedTopic> LearnedTopics { get; set; }
        public DbSet<RecommendedTopic> RecommendedTopics { get; set; }
        public DbSet<LearningDay> LearningDays { get; set; }
        public DbSet<LearningDayTopic> LearningDayTopics { get; set; }
        public DbSet<LearningDayLink> LearningDayLinks { get; set; }
        public DbSet<Limit> Limits { get; set; }

        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }

        public override int SaveChanges()
        {
            foreach (var entity in ChangeTracker.Entries().Where(e => e.State == EntityState.Modified))
            {
                var saveEntity = entity.Entity as IVersionedEntity;
                saveEntity.OnSaveChanges();
            }

            return base.SaveChanges();
        }

        #region Required
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ApplicationUser>()
                .HasIndex(e => e.NormalizedEmail)
                .HasName("EmailIndex")
                .IsUnique();
            modelBuilder.Entity<ApplicationUser>()
                .HasOne(e => e.Employee)
                .WithOne(e => e.User)
                .HasForeignKey<ApplicationUser>(e => e.EmployeeId);

            modelBuilder.Entity<Employee>()
                .HasKey(e => e.UserId);
            modelBuilder.Entity<Employee>()
                .Property(e => e.Version)
                .HasDefaultValue(0);
            modelBuilder.Entity<Employee>()
                .HasOne(e => e.User)
                .WithOne(e => e.Employee)
                .HasForeignKey<Employee>(e => e.UserId);
            modelBuilder.Entity<Employee>()
                .HasOne(e => e.Leader)
                .WithMany(e => e.Subordinates)
                .OnDelete(DeleteBehavior.Restrict)
                .HasForeignKey(e => e.LeaderId);

            modelBuilder.Entity<Invite>()
                .HasKey(e => e.Id);
            modelBuilder.Entity<Invite>()
                .Property(e => e.Id)
                .ValueGeneratedOnAdd();
            modelBuilder.Entity<Invite>()
                .Property(e => e.Version)
                .HasDefaultValue(0);
            modelBuilder.Entity<Invite>()
                .HasOne(e => e.Inviter)
                .WithMany(e => e.Invites)
                .HasForeignKey(e => e.InviterId);

            modelBuilder.Entity<Topic>()
                .HasKey(e => e.Id);
            modelBuilder.Entity<Topic>()
                .Property(e => e.Id)
                .ValueGeneratedOnAdd();
            modelBuilder.Entity<Topic>()
                .Property(e => e.Version)
                .HasDefaultValue(0);
            modelBuilder.Entity<Topic>()
                .HasOne(e => e.ParentTopic)
                .WithMany(e => e.Subtopics)
                .OnDelete(DeleteBehavior.Restrict)
                .HasForeignKey(e => e.ParentTopicId);

            modelBuilder.Entity<TopicLink>()
                .HasKey(e => e.TopicId);
            modelBuilder.Entity<TopicLink>()
                .Property(e => e.Version)
                .HasDefaultValue(0);
            modelBuilder.Entity<TopicLink>()
                .HasOne(e => e.Topic)
                .WithMany(e => e.TopicLinks)
                .HasForeignKey(e => e.TopicId);

            modelBuilder.Entity<LearnedTopic>()
                .HasKey(e => new { e.TopicId, e.EmployeeId });
            modelBuilder.Entity<LearnedTopic>()
                .Property(e => e.Version)
                .HasDefaultValue(0);
            modelBuilder.Entity<LearnedTopic>()
                .HasOne(e => e.Topic)
                .WithMany(e => e.LearnedTopics)
                .HasForeignKey(e => e.TopicId);
            modelBuilder.Entity<LearnedTopic>()
                .HasOne(e => e.Employee)
                .WithMany(e => e.LearnedTopics)
                .HasForeignKey(e => e.EmployeeId);

            modelBuilder.Entity<RecommendedTopic>()
                .HasKey(e => new { e.TopicId, e.EmployeeId });
            modelBuilder.Entity<RecommendedTopic>()
                .Property(e => e.Version)
                .HasDefaultValue(0);
            modelBuilder.Entity<RecommendedTopic>()
                .HasOne(e => e.Topic)
                .WithMany(e => e.RecommendedTopics)
                .HasForeignKey(e => e.TopicId);
            modelBuilder.Entity<RecommendedTopic>()
                .HasOne(e => e.Employee)
                .WithMany(e => e.RecommendedTopics)
                .HasForeignKey(e => e.EmployeeId);

            modelBuilder.Entity<LearningDay>()
                .HasKey(e => new { e.Date, e.EmployeeId });
            modelBuilder.Entity<LearningDay>()
                .Property(e => e.Version)
                .HasDefaultValue(0);
            modelBuilder.Entity<LearningDay>()
                .HasOne(e => e.Employee)
                .WithMany(e => e.LearningDays)
                .HasForeignKey(e => e.EmployeeId);

            modelBuilder.Entity<LearningDayTopic>()
                .HasKey(e => new { e.LearningDayDate, e.LearningDayEmployeeId, e.TopicId });
            modelBuilder.Entity<LearningDayTopic>()
                .Property(e => e.Version)
                .HasDefaultValue(0);
            modelBuilder.Entity<LearningDayTopic>()
                .HasOne(e => e.LearningDay)
                .WithMany(e => e.LearningDayTopics)
                .HasForeignKey(e => new { e.LearningDayDate, e.LearningDayEmployeeId});
            modelBuilder.Entity<LearningDayTopic>()
                .HasOne(e => e.Topic)
                .WithMany(e => e.LearningDayTopics)
                .HasForeignKey(e => e.TopicId);

            modelBuilder.Entity<LearningDayLink>()
                .HasKey(e => new { e.LearningDayDate, e.LearningDayEmployeeId });
            modelBuilder.Entity<LearningDayLink>()
                .Property(e => e.Version)
                .HasDefaultValue(0);
            modelBuilder.Entity<LearningDayLink>()
                .HasOne(e => e.LearningDay)
                .WithMany(e => e.LearningDayLinks)
                .HasForeignKey(e => new { e.LearningDayDate, e.LearningDayEmployeeId });

            modelBuilder.Entity<Limit>()
                .HasKey(e => new { e.EmployeeId, e.StartDate, e.EndDate });
            modelBuilder.Entity<Limit>()
                .Property(e => e.Version)
                .HasDefaultValue(0);
            modelBuilder.Entity<Limit>()
                .HasOne(e => e.Employee)
                .WithMany(e => e.Limits)
                .HasForeignKey(e => e.EmployeeId);
        }
        #endregion
    }
}