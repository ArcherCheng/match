using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace MatchApi.Models
{
    public partial class AppDbContext : DbContext
    {
        public virtual DbSet<Aa9log10> Aa9log10 { get; set; }
        public virtual DbSet<Aa9log20> Aa9log20 { get; set; }
        public virtual DbSet<CheckboxItem> CheckboxItem { get; set; }
        public virtual DbSet<Liker> Liker { get; set; }
        public virtual DbSet<Member> Member { get; set; }
        public virtual DbSet<MemberCondition> MemberCondition { get; set; }
        public virtual DbSet<MemberPhoto> MemberPhoto { get; set; }
        public virtual DbSet<Message> Message { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.4-servicing-10062");

            modelBuilder.Entity<Aa9log10>(entity =>
            {
                entity.ToTable("AA9log10");

                entity.HasIndex(e => new { e.TableName, e.UpdateTime })
                    .HasName("in_AA9log10_tablename");

                entity.Property(e => e.DeleteData).HasColumnType("xml");

                entity.Property(e => e.InsertData).HasColumnType("xml");

                entity.Property(e => e.TableName).HasMaxLength(32);

                entity.Property(e => e.UpdateTime)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");
            });

            modelBuilder.Entity<Aa9log20>(entity =>
            {
                entity.ToTable("AA9log20");

                entity.HasIndex(e => new { e.UserId, e.RequestTime })
                    .HasName("in_AA9log20_userid");

                entity.Property(e => e.Destination).HasMaxLength(512);

                entity.Property(e => e.IpAddress).HasMaxLength(32);

                entity.Property(e => e.Method).HasMaxLength(32);

                entity.Property(e => e.QueryString).HasMaxLength(512);

                entity.Property(e => e.Refer).HasMaxLength(512);

                entity.Property(e => e.RequestTime)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.UserId)
                    .IsRequired()
                    .HasMaxLength(32);
            });

            modelBuilder.Entity<CheckboxItem>(entity =>
            {
                entity.HasIndex(e => new { e.KeyGroup, e.KeyValue })
                    .HasName("CheckboxItem_in1")
                    .IsUnique();

                entity.Property(e => e.KeyGroup)
                    .IsRequired()
                    .HasMaxLength(32);

                entity.Property(e => e.KeyLabel)
                    .IsRequired()
                    .HasMaxLength(64);

                entity.Property(e => e.KeyValue)
                    .IsRequired()
                    .HasMaxLength(32);

                entity.Property(e => e.WriteIp).HasMaxLength(32);

                entity.Property(e => e.WriteTime).HasColumnType("datetime");

                entity.Property(e => e.WriteUser).HasMaxLength(32);
            });

            modelBuilder.Entity<Liker>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.LikerId })
                    .HasName("Pk_liker");

                entity.Property(e => e.AddedDate).HasColumnType("datetime");

                entity.Property(e => e.WriteIp).HasMaxLength(32);

                entity.Property(e => e.WriteTime).HasColumnType("datetime");

                entity.Property(e => e.WriteUser).HasMaxLength(32);

                entity.HasOne(d => d.LikerNavigation)
                    .WithMany(p => p.LikerLikerNavigation)
                    .HasForeignKey(d => d.LikerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Liker_MyLiker");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.LikerUser)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Liker_LikerMe");
            });

            modelBuilder.Entity<Member>(entity =>
            {
                entity.HasKey(e => e.UserId)
                    .HasName("pk_Member");

                entity.HasIndex(e => e.Email)
                    .HasName("Member_in1")
                    .IsUnique();

                entity.HasIndex(e => e.Phone)
                    .HasName("Member_in2")
                    .IsUnique();

                entity.Property(e => e.ActiveDate).HasColumnType("datetime");

                entity.Property(e => e.Blood).HasMaxLength(2);

                entity.Property(e => e.City).HasMaxLength(32);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(32);

                entity.Property(e => e.Introduction).HasMaxLength(2048);

                entity.Property(e => e.JobType).HasMaxLength(32);

                entity.Property(e => e.LikeCondition).HasMaxLength(2048);

                entity.Property(e => e.LoginDate).HasColumnType("datetime");

                entity.Property(e => e.MainPhotoUrl).HasMaxLength(256);

                entity.Property(e => e.NickName)
                    .IsRequired()
                    .HasMaxLength(32);

                entity.Property(e => e.PasswordHash).HasMaxLength(2048);

                entity.Property(e => e.PasswordSalt).HasMaxLength(2048);

                entity.Property(e => e.Phone)
                    .IsRequired()
                    .HasMaxLength(16);

                entity.Property(e => e.Religion).HasMaxLength(32);

                entity.Property(e => e.School).HasMaxLength(32);

                entity.Property(e => e.Star).HasMaxLength(32);

                entity.Property(e => e.Subjects).HasMaxLength(32);

                entity.Property(e => e.UserRole).HasMaxLength(16);

                entity.Property(e => e.WriteIp).HasMaxLength(32);

                entity.Property(e => e.WriteTime).HasColumnType("datetime");

                entity.Property(e => e.WriteUser).HasMaxLength(32);
            });

            modelBuilder.Entity<MemberCondition>(entity =>
            {
                entity.HasKey(e => e.UserId)
                    .HasName("pk_MemberCondition");

                entity.Property(e => e.UserId).ValueGeneratedNever();

                entity.Property(e => e.BloodInclude).HasMaxLength(16);

                entity.Property(e => e.CityInclude).HasMaxLength(128);

                entity.Property(e => e.JobTypeInclude).HasMaxLength(128);

                entity.Property(e => e.ReligionInclude).HasMaxLength(128);

                entity.Property(e => e.StarInclude).HasMaxLength(128);

                entity.Property(e => e.WriteIp).HasMaxLength(32);

                entity.Property(e => e.WriteTime).HasColumnType("datetime");

                entity.Property(e => e.WriteUser).HasMaxLength(32);

                entity.HasOne(d => d.User)
                    .WithOne(p => p.MemberCondition)
                    .HasForeignKey<MemberCondition>(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Condition_Member");
            });

            modelBuilder.Entity<MemberPhoto>(entity =>
            {
                entity.HasIndex(e => new { e.UserId, e.Id })
                    .HasName("MemberPhoto_n1");

                entity.Property(e => e.AddedDate).HasColumnType("datetime");

                entity.Property(e => e.Descriptions).HasMaxLength(256);

                entity.Property(e => e.PhotoUrl).HasMaxLength(256);

                entity.Property(e => e.PublicId).HasMaxLength(256);

                entity.Property(e => e.WriteIp).HasMaxLength(32);

                entity.Property(e => e.WriteTime).HasColumnType("datetime");

                entity.Property(e => e.WriteUser).HasMaxLength(32);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.MemberPhoto)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Photo_Member");
            });

            modelBuilder.Entity<Message>(entity =>
            {
                entity.HasIndex(e => new { e.RecipientId, e.SenderId })
                    .HasName("message_in2");

                entity.HasIndex(e => new { e.SenderId, e.RecipientId })
                    .HasName("message_in1");

                entity.Property(e => e.Contents)
                    .IsRequired()
                    .HasMaxLength(1024);

                entity.Property(e => e.ReadDate).HasColumnType("datetime");

                entity.Property(e => e.SendDate).HasColumnType("datetime");

                entity.Property(e => e.WriteIp).HasMaxLength(32);

                entity.Property(e => e.WriteTime).HasColumnType("datetime");

                entity.Property(e => e.WriteUser).HasMaxLength(32);

                entity.HasOne(d => d.Recipient)
                    .WithMany(p => p.MessageRecipient)
                    .HasForeignKey(d => d.RecipientId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Message_Recipient");

                entity.HasOne(d => d.Sender)
                    .WithMany(p => p.MessageSender)
                    .HasForeignKey(d => d.SenderId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Message_Sender");
            });
        }
    }
}
