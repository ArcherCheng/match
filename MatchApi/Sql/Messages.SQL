
--------------------------------------------------------------------------------
--留言版 bulletin
--------------------------------------------------------------------------------
--drop table Message
go
create table Message
(
	Id            int identity(1,1) not null,
	-- PartyId       int not null,
	SenderId      int not null,
	RecipientId   int not null,
	Contents      nvarchar(1024) not null, 
	SendDate      datetime not null, 

	IsRead           bit NOT null, 
	ReadDate         datetime null, 
	SenderDeleted    bit NOT null, 
	RecipientDeleted bit NOT null, 

	--以下每檔資料表都會有這些欄位
	WriteType     integer        null,
	WriteTime     datetime       null,
	WriteUser     nvarchar(32)   null,
	WriteIp       nvarchar(32)   null,
	constraint pk_Message primary key (Id)
);
go
create index message_in1 on Message(SenderId,RecipientId) ;
go          
create index message_in2 on Message(RecipientId,SenderId) ;
go          

-- --alter table message drop constraint message_partyId
-- alter table Message add constraint Message_Party
--       foreign key (PartyId)
--       references Party(PartyId)
-- 	  ON UPDATE CASCADE
-- 	  ON DELETE NO ACTION
-- go

--alter table message drop constraint message_senderId
alter table Message add constraint Message_Sender
      foreign key (SenderId)
      references Member(UserId)
	  ON UPDATE NO ACTION
	  ON DELETE NO ACTION

go

--alter table message drop constraint message_recipientId
alter table Message add constraint Message_Recipient
      foreign key (RecipientId)
      references Member(UserId)
	  ON UPDATE NO ACTION
	  ON DELETE NO ACTION

go


create trigger tr_Message_iud on Message after insert,update,delete not for replication as
begin
	declare @tablename nvarchar(32);
	set @tablename='Message';

	declare @istype tinyint;
	set @istype=0;
 
	if exists(select 1 from inserted) and not exists(select 1 from deleted)
		set @istype = 1;    --insert
	else if not exists(select 1 from inserted) and exists(select 1 from deleted)
		set @istype = 3;    --delete
	else if exists(select 1 from inserted) and exists(select 1 from deleted)
		begin
			set @istype = 2;    --update
			--以下情況不做log
			--使用者欲刪除資料時,程式會先更新刪除者及刪除時間位置(writetype=3)..等,這是屬於刪除的前置作業,不做log,只做刪除這個動作的log
			--月結過帳時須資料會整批先清為零(writetype=4),就不做log,逐筆計算時,再做寫入log
			declare @wrtype int;
			select @wrtype=writetype from inserted;
			if @wrtype > 2 return; 
		end
	
	declare @insertdata nvarchar(max);
	declare @deletedata nvarchar(max);

	set @insertdata=(select * from inserted for json auto);
	set @deletedata=(select * from deleted for json auto);

	insert into aa9log10(tablename,insertdata,deletedata,istype)values(@tablename,@insertdata,@deletedata,@istype);
end
go